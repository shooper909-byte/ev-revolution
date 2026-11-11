<?php
/* Applied to the existing Pressable theme runtime, preserving its handlers.
 * Keep these destinations in sync with src/lib/telehealth.ts. */
function eves_sisters_care_pages_20261109() {
    return array(
        '/care' => '/care',
        '/treatments' => '/care',
        '/care/weight-management' => '/care/weight-management',
        '/care/hormones-menopause' => '/care/hormones-menopause',
        '/care/skin-beauty' => '/care/skin-beauty',
        '/care/energy-performance' => '/care/energy-vitality',
        '/care/longevity-healthspan' => '/care/longevity-renewal',
        '/care/recovery-rejuvenation' => '/care/rest-wellbeing',
        '/eves-secret' => '/care/eves-secrets',
        '/peptide-care' => '/care/peptides',
        '/packages' => '/packages',
        '/packages/mrs-collection' => '/mrs-collection',
        '/packages/mrs-jones' => '/mrs-collection/mrs-jones',
        '/packages/mrs-golden' => '/mrs-collection/mrs-golden',
        '/packages/mrs-robinson' => '/mrs-collection/mrs-robinson',
    );
}

function eves_sisters_connect_care_links_20261109($content) {
    /* Match the exported module exactly so React generates the same links
     * as the server document, including after internal navigation. */
    $content = str_replace(
        'connected:!1,origin:"https://eve-sisters.vercel.app",domain:"evevolutionwellness.com",deepLinks:!1',
        'connected:!0,origin:"https://evevolutionwellness.com",domain:"evevolutionwellness.com",deepLinks:!0',
        $content
    );
    $content = str_replace(
        '"/care/recovery-rejuvenation":"/care/rest-recovery"',
        '"/care/recovery-rejuvenation":"/care/rest-wellbeing"',
        $content
    );
    $content = str_replace(
        'Continues on our secure telehealth platform.',
        'Continues on evevolutionwellness.com, our secure telehealth platform.',
        $content
    );
    return preg_replace_callback(
        '~https://eve-sisters[.]vercel[.]app/[?](?:[^"\s<>\\\\]|\\\\u0026)+~',
        function ($match) {
            $unicode_ampersands = strpos($match[0], '\\u0026') !== false;
            $decoded = html_entity_decode(str_replace('\\u0026', '&', $match[0]), ENT_QUOTES, 'UTF-8');
            $parts = parse_url($decoded);
            parse_str($parts['query'] ?? '', $query);
            if (($query['utm_source'] ?? '') !== 'evevolutionhealth') {
                return $match[0];
            }
            $destinations = array();
            foreach (eves_sisters_care_pages_20261109() as $source => $target) {
                $destinations[str_replace('/', '-', trim($source, '/'))] = $target;
            }
            $path = $destinations[$query['utm_content'] ?? ''] ?? '/start';
            $url = 'https://evevolutionwellness.com' . $path . '?' . http_build_query($query);
            if ($unicode_ampersands) { return str_replace('&', '\\u0026', $url); }
            return strpos($match[0], '&amp;') !== false ? str_replace('&', '&amp;', $url) : $url;
        },
        $content
    );
}

function eves_sisters_care_handoff_20261109() {
    if (is_admin()) { return; }
    $path = '/' . trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $legacy = array(
        '/pillars/weight-loss' => '/care/weight-management',
        '/pillars/hormones-menopause' => '/care/hormones-menopause',
        '/pillars/skin-beauty' => '/care/skin-beauty',
        '/pillars/energy-performance' => '/care/energy-performance',
        '/pillars/recovery-rejuvenation' => '/care/recovery-rejuvenation',
        '/pillars/longevity-healthspan' => '/care/longevity-healthspan',
        '/weight-management' => '/care/weight-management',
        '/menopause-hormones' => '/care/hormones-menopause',
        '/skin-beauty' => '/care/skin-beauty',
        '/energy-performance' => '/care/energy-performance',
        '/recovery' => '/care/recovery-rejuvenation',
        '/longevity' => '/care/longevity-healthspan',
        '/peptides' => '/peptide-care',
    );
    $source = $legacy[$path] ?? $path;
    if (!preg_match('~^/(care|treatments|peptide-care|eves-secret|packages|pillars)(/|$)~', $source)) { return; }
    $pages = eves_sisters_care_pages_20261109();
    $target = $pages[$source] ?? '/start';
    $query = array(
        'utm_source' => 'evevolutionhealth',
        'utm_medium' => 'referral',
        'utm_campaign' => 'handoff',
        'utm_content' => str_replace('/', '-', trim($source, '/')),
    );
    nocache_headers();
    wp_redirect('https://evevolutionwellness.com' . $target . '?' . http_build_query($query), 307);
    exit;
}
/* Runs before the earlier must-use-plugin handoff on init priority 0. */
add_action('init', 'eves_sisters_care_handoff_20261109', -1);
