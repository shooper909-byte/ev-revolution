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
        // Restore the existing Mrs. Collection document, including its images and scripts.
        $file = get_template_directory() . '/static-pages/mrs-collection.html';
        if (!is_readable($file)) { return; }
        $html = file_get_contents($file);
        $description = 'Meet Mrs. Jones, Mrs. Golden and Mrs. Robinson. Explore the Mrs. Collection by Eve’s Sisters, with care chosen for your individual needs.';
        $html = str_replace('Meet Mrs. Jones, Mrs. Golden and Mrs. Robinson. Three stories, with care chosen for your individual needs.', $description, $html);
        $html = str_replace('</head>', '<link rel="canonical" href="https://evevolutionhealth.com/packages/mrs-collection"/></head>', $html);
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
