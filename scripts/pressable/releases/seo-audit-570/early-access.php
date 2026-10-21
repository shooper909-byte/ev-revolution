<?php
/** WordPress transport for the approved early-access form. */
if (!defined('ABSPATH')) { exit; }

function eves_sisters_early_access_endpoint() {
    if (is_admin()) { return; }
    $path = rtrim((string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    if ($path !== '/api/early-access') { return; }
    nocache_headers();
    header('Content-Type: application/json; charset=' . get_bloginfo('charset'));
    if (strtoupper((string) $_SERVER['REQUEST_METHOD']) !== 'POST') {
        status_header(405);
        header('Allow: POST');
        echo wp_json_encode(array('message' => 'Method not allowed.'));
        exit;
    }
    $raw = (string) file_get_contents('php://input');
    $body = json_decode($raw, true);
    if (strlen($raw) > 4096 || !is_array($body)) {
        status_header(400);
        echo wp_json_encode(array('message' => 'Invalid request.'));
        exit;
    }
    // Preserve the exact consent boolean. Do not collect or forward extra fields.
    $payload = array();
    foreach (array('firstName', 'email', 'state', 'serviceInterest', 'company', 'marketingConsent') as $field) {
        if (array_key_exists($field, $body)) { $payload[$field] = $body[$field]; }
    }
    $response = wp_remote_post('https://ev-revolution.vercel.app/api/early-access', array(
        'timeout' => 55,
        'redirection' => 0,
        'headers' => array('Content-Type' => 'application/json', 'Accept' => 'application/json'),
        'body' => wp_json_encode($payload),
    ));
    if (is_wp_error($response)) {
        status_header(502);
        echo wp_json_encode(array('message' => 'Signup is temporarily unavailable. Please try again shortly.'));
        exit;
    }
    $code = wp_remote_retrieve_response_code($response);
    $result = json_decode(wp_remote_retrieve_body($response), true);
    if (!is_array($result) || !isset($result['message']) || !is_string($result['message']) || $code < 200 || $code > 599) {
        status_header(502);
        echo wp_json_encode(array('message' => 'We could not confirm your signup. Please try again shortly.'));
        exit;
    }
    status_header($code);
    $safe = array('message' => $result['message']);
    if (isset($result['pendingConfirmation'])) { $safe['pendingConfirmation'] = (bool) $result['pendingConfirmation']; }
    echo wp_json_encode($safe);
    exit;
}
add_action('template_redirect', 'eves_sisters_early_access_endpoint', -1950);

function eves_sisters_release_sitemap() {
    if (is_admin()) { return; }
    $path = (string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if ($path !== '/sitemap.xml') { return; }
    $file = get_template_directory() . '/static-pages/sitemap.xml';
    if (!is_readable($file)) { return; }
    status_header(200);
    header('Content-Type: application/xml; charset=UTF-8');
    readfile($file);
    exit;
}
// Serve the release sitemap before the legacy MU plugin's init-priority-0 sitemap.
add_action('init', 'eves_sisters_release_sitemap', -1);

/* SEO audit 570 release: preserve existing prebuilt pages and integrations. */
function eves_sisters_seo_audit_570() {
    if (is_admin()) { return; }
    $path = rtrim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    if ($path === '/packages/mrs-collection') {
        $html = <<<'EVES_SEO_COLLECTION_570'
<!DOCTYPE html><!--mv_POLZO_mV6Hdu3dkbTB--><html lang="en" class="__variable_63c8e8 __variable_d8ebd1"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/_next/static/css/2040e7361bfd9f3f.css" data-precedence="next"/><link rel="stylesheet" href="/_next/static/css/4939f2591ac2fb97.css" data-precedence="next"/><link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/webpack-c97dc5141c2cb6ba.js"/><title>The Mrs. Collection | Eve’s Sisters</title><meta name="description" content="Discover the Mrs. Collection by Eve’s Sisters. Explore our approach to women’s wellness, learn what to review, and find your next step."/><meta name="robots" content="index, follow"/><meta property="og:title" content="Eve’s Sisters — The Evolution of a Woman&#x27;s Body"/><meta property="og:description" content="Evidence-led women&#x27;s wellness and longevity for every stage. Different stages. The same power."/><meta property="og:site_name" content="Eve’s Sisters"/><meta property="og:image:type" content="image/png"/><meta property="og:image:width" content="1254"/><meta property="og:image:height" content="1254"/><meta property="og:image:alt" content="Eve’s Sisters — The Evolution of a Woman&#x27;s Body
"/><meta property="og:image" content="https://evevolutionhealth.com/opengraph-image.png?23bfecfc5d927106"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="Eve’s Sisters — The Evolution of a Woman&#x27;s Body"/><meta name="twitter:description" content="Evidence-led women&#x27;s wellness and longevity for every stage. Different stages. The same power."/><meta name="twitter:image:type" content="image/png"/><meta name="twitter:image:width" content="1254"/><meta name="twitter:image:height" content="1254"/><meta name="twitter:image:alt" content="Eve’s Sisters — The Evolution of a Woman&#x27;s Body
"/><meta name="twitter:image" content="https://evevolutionhealth.com/opengraph-image.png?23bfecfc5d927106"/><link rel="icon" href="/icon.svg?deac2cecbc9789be" type="image/svg+xml" sizes="any"/><link rel="canonical" href="https://evevolutionhealth.com/packages/mrs-collection"/><style>.collection-overview{max-width:1120px;margin:auto;padding:80px 24px 96px}.collection-overview h1{font-family:Georgia,serif;font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.1;margin:24px 0}.collection-overview h2{font-family:Georgia,serif;font-size:1.9rem;margin:0 0 20px}.collection-overview p{color:#ebe0d3;line-height:1.85;margin:20px 0}.collection-overview .collection-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:56px}.collection-overview a{color:#dab16a;text-decoration:underline;text-underline-offset:4px}.collection-overview .continue{display:inline-block;background:#642a52;color:#f7efe6;text-decoration:none;padding:16px 24px;margin-top:8px}.collection-overview ul{list-style:none;padding:0}.collection-overview li{margin:18px 0}.collection-footer{border-top:1px solid #36302d;padding:28px 24px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap;color:#dab16a;font-size:.9rem}@media(max-width:700px){.collection-overview{padding-top:48px}.collection-overview .collection-grid{grid-template-columns:1fr;gap:40px}}</style></head><body class="font-sans"><header class="sticky top-0 z-50 overflow-x-clip border-b border-onyx-700/80 bg-onyx/90 backdrop-blur-md"><div class="mx-auto w-full max-w-6xl px-5 sm:px-8 flex min-h-20 max-w-[1600px] flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4 min-[1536px]:flex-nowrap"><a class="group flex min-w-0 items-center gap-2 sm:gap-3 " aria-label="Eve’s Sisters — home" href="/"><span aria-hidden="true" class="relative block h-12 w-9 shrink-0 overflow-hidden bg-black"><img alt="" width="1280" height="1280" decoding="async" data-nimg="1" class="absolute max-w-none" style="color:transparent;width:310%;height:auto;left:-100%;top:-39%" sizes="112px" srcSet="/_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=16&amp;q=75 16w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=32&amp;q=75 32w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=48&amp;q=75 48w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=64&amp;q=75 64w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=96&amp;q=75 96w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=128&amp;q=75 128w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=256&amp;q=75 256w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=384&amp;q=75 384w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2Fimages%2Feves-sisters-logo.png&amp;w=3840&amp;q=75"/></span><span class="flex flex-col leading-none"><span class="whitespace-nowrap font-display text-base tracking-[0.08em] sm:text-xl sm:tracking-[0.14em]"><span class="gold-text">EVE’S</span><span class="gold-text"> SISTERS</span></span><span class="mt-1.5 text-[0.5rem] tracking-[0.04em] text-champagne sm:text-[0.5625rem]">The Evolution of a Woman’s Body</span></span></a><nav aria-label="Primary" class="hidden w-full items-center justify-center gap-3 lg:flex min-[1536px]:w-auto min-[1600px]:gap-5"><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 shrink-0" href="/">Home</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/services">Services</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/gender-affirming-care">Gender-Affirming Care</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-champagne " aria-current="page" href="/packages/mrs-collection">Packages</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/about">About</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 hidden min-[1536px]:inline" href="/about#philosophy">Our Approach</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/resources">Resources</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/faq">FAQ</a><a class="brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne text-ivory-200 " href="/contact">Contact</a><a href="https://eve-sisters.vercel.app/?utm_source=evevolutionhealth&amp;utm_medium=referral&amp;utm_campaign=handoff&amp;utm_content=packages-mrs-collection" title="Continues on our secure telehealth platform." class="button-sheen brand-eyebrow whitespace-nowrap bg-plum px-4 py-3 text-[0.6875rem] xl:px-5 xl:text-xs tracking-[0.14em] text-ivory transition-colors hover:bg-plum-600">Start Consultation</a></nav><button type="button" aria-expanded="false" aria-controls="mobile-nav" class="hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-full border lg:hidden"><span class="sr-only">Open menu</span><svg viewBox="0 0 24 24" class="h-4 w-4 text-champagne" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"></path></svg></button></div><div id="mobile-nav" hidden="" class="border-t border-onyx-700 bg-onyx-900 lg:hidden"><div class="mx-auto w-full max-w-6xl px-5 sm:px-8 grid gap-1 py-6"><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/">Home</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/services">Services</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/gender-affirming-care">Gender-Affirming Care</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-champagne" aria-current="page" href="/packages/mrs-collection">Packages</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/about">About</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/about#philosophy">Our Approach</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/resources">Resources</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/faq">FAQ</a><a class="border-b border-onyx-800 py-3 font-display text-lg text-ivory" href="/contact">Contact</a><a href="https://eve-sisters.vercel.app/?utm_source=evevolutionhealth&amp;utm_medium=referral&amp;utm_campaign=handoff&amp;utm_content=packages-mrs-collection" class="brand-eyebrow mt-4 bg-plum px-6 py-4 text-center text-[0.625rem] text-ivory">Start Your Consultation</a><p class="mt-3 text-center text-xs text-ivory-200/70">Continues on our secure telehealth platform.</p></div></div></header><main id="main"><div class="collection-overview"><p class="brand-eyebrow text-champagne ">Eve’s Sisters</p><h1 class="mt-8 font-display text-[2.5rem] leading-tight text-ivory sm:text-5xl">The Mrs. Collection</h1><p class="mt-6 max-w-3xl text-lg leading-relaxed text-ivory-200/85">Different stages. The same power. The Mrs. Collection is part of the Eve’s Sisters approach to helping women explore wellness options as their needs and priorities change. A collection name is a way to organize the experience; it does not determine medical eligibility.</p><div class="collection-grid"><section aria-labelledby="collection-options"><h2 id="collection-options" class="font-display text-3xl text-ivory">Begin with clear information</h2><p class="mt-5 leading-relaxed text-ivory-200/85">Before choosing a plan, review its current price, what is included, any separate medication or laboratory costs, and its cancellation terms. Current plan details and enrollment steps are provided on our telehealth platform. This overview does not offer a prescription or guarantee that a particular treatment is available to you.</p><a href="https://eve-sisters.vercel.app/?utm_source=evevolutionhealth&amp;utm_medium=referral&amp;utm_campaign=handoff&amp;utm_content=packages-mrs-collection" class="continue">Continue to the telehealth platform</a><p class="mt-3 text-sm text-ivory-200/75">Continues on our secure telehealth platform.</p></section><section aria-labelledby="collection-support"><h2 id="collection-support" class="font-display text-3xl text-ivory">Find your next step</h2><p class="mt-5 leading-relaxed text-ivory-200/85">Learn about our brand, explore our service information, or contact the team with general questions. Clinical evaluations and treatment decisions belong to independent licensed healthcare professionals. Availability varies by service and state, and an evaluation does not guarantee a prescription.</p><ul class="mt-6 space-y-4 text-champagne"><li><a class="underline underline-offset-4" href="/services">Explore service information</a></li><li><a class="underline underline-offset-4" href="/about">About Eve’s Sisters</a></li><li><a class="underline underline-offset-4" href="/contact">Contact our team</a></li></ul></section></div></div><!--$--><!--/$--></div></main><footer class="collection-footer"><a href="/about">About Eve’s Sisters</a><a href="/contact">Contact</a><a href="/privacy-policy">Privacy</a><a href="/disclaimer">Medical disclaimer</a></footer><script>document.querySelector('[aria-controls="mobile-nav"]').addEventListener("click",function(){var n=document.getElementById("mobile-nav");var open=this.getAttribute("aria-expanded")==="true";this.setAttribute("aria-expanded",String(!open));n.hidden=open;});</script></body></html>
EVES_SEO_COLLECTION_570;
        $html = preg_replace('#/_next/static/([A-Za-z0-9_./-]+)#', '/next-asset-v2150?file=static/$1', $html);
        $html = preg_replace('#/icon\.svg\?[A-Za-z0-9]+#', '/site-icon', $html);
        status_header(200);
        header('Content-Type: text/html; charset=UTF-8');
        echo $html;
        exit;
    }
    if (!in_array($path, array('/about', '/contact', '/disclaimer', '/sitemap.xml'), true)) { return; }
    ob_start(function ($html) use ($path) {
        if ($path === '/sitemap.xml') {
            $url = 'https://evevolutionhealth.com/packages/mrs-collection';
            if (strpos($html, $url) === false) {
                $html = str_replace('</urlset>', '<url><loc>' . $url . '</loc></url></urlset>', $html);
            }
            return $html;
        }
        if ($path === '/about') {
            $html = str_replace('About Eve’s Sisters | Women’s Wellness at Every Stage of Life', 'About Eve’s Sisters | Wellness for Every Stage of Life', $html);
        }
        // Replace any existing canonical rather than introducing duplicates.
        $html = preg_replace('~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>~i', '', $html);
        return str_replace('</head>', '<link rel="canonical" href="https://evevolutionhealth.com' . $path . '"/></head>', $html);
    });
}
add_action('init', 'eves_sisters_seo_audit_570', -2);
