<?php
/* Apply the WordPress API equivalents of the operations-readiness fixes.
 * Run against a staged theme only; back up production before installing it.
 * Credentials and unrelated handlers are preserved. */
$theme = $argv[1] ?? '';
if (!is_dir($theme) || !is_file($theme . '/functions.php')) { throw new RuntimeException('Theme path required.'); }
$path = $theme . '/functions.php';
$code = file_get_contents($path);
$replacements = [
    "                'signature-bundle' => array('Signature', 'bundle'),\n" => '',
    "                'elite-bundle' => array('Elite', 'bundle'),\n" => '',
    "                'hormone-signature-bundle' => array('Hormone Signature', 'bundle'),\n" => '',
    'if (!$config || !$option || !$billing || $first' => 'if (!$config || !$option || !$billing || ($category_key === \'eves-secret\' && $billing !== \'month to month\') || $first',
    "'billingPreference' => \$billing, 'firstName'" => "'billingPreference' => \$category_key === 'eves-secret' ? 'one consultation' : \$billing, 'firstName'",
];
foreach ($replacements as $old => $new) {
    if (substr_count($code, $old) !== 1) { throw new RuntimeException('Unexpected deployed handler; no files written.'); }
    $code = str_replace($old, $new, $code);
}
$code = str_replace('Treatment requests are temporarily unavailable. Please try again shortly.', 'Treatment requests are temporarily unavailable. Please contact our team through the Contact page for next steps. Do not share medical information there.', $code);
if (strpos($code, 'function eves_sisters_contact_endpoint') !== false) { throw new RuntimeException('Contact handler already exists; no files written.'); }
$code .= <<<'HANDLER'

/* General inquiries only. Clinical intake remains with the approved partner. */
function eves_sisters_contact_endpoint() {
    if (is_admin()) { return; }
    $path = (string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if ($path !== '/api/contact') { return; }
    nocache_headers();
    header('Content-Type: application/json; charset=' . get_bloginfo('charset'));
    $respond = static function($status, $message) {
        status_header($status);
        echo wp_json_encode(array('message' => $message));
        exit;
    };
    if (strtoupper((string) $_SERVER['REQUEST_METHOD']) !== 'POST') {
        header('Allow: POST');
        $respond(405, 'Method not allowed.');
    }
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST) : '';
    if ($origin && $origin !== parse_url(home_url(), PHP_URL_HOST)) {
        $respond(403, 'Please use the Contact form on our website.');
    }
    $key = 'eves_contact_' . hash_hmac('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''), wp_salt('nonce'));
    $hits = (int) get_transient($key);
    if ($hits >= 5) { header('Retry-After: 60'); $respond(429, 'Please wait a moment before trying again.'); }
    set_transient($key, $hits + 1, 60);
    $raw = file_get_contents('php://input', false, null, 0, 16385);
    if (strlen($raw) > 16384) { $respond(413, 'Please keep your message under 5,000 characters.'); }
    $body = json_decode($raw, true);
    if (!is_array($body)) { $respond(400, 'Invalid request.'); }
    $name = isset($body['name']) && is_string($body['name']) ? sanitize_text_field($body['name']) : '';
    $email = isset($body['email']) && is_string($body['email']) ? sanitize_email($body['email']) : '';
    $topic = isset($body['topic']) && is_string($body['topic']) ? sanitize_text_field($body['topic']) : 'General';
    $message = isset($body['message']) && is_string($body['message']) ? sanitize_textarea_field($body['message']) : '';
    if (!$name || !$message || !is_email($email) || strlen($name) > 160 || strlen($topic) > 100 || strlen($message) > 5000) {
        $respond(400, 'Please complete every field with a valid email address and a message under 5,000 characters.');
    }
    $webhook = defined('EV_CONTACT_WEBHOOK_URL') ? EV_CONTACT_WEBHOOK_URL : getenv('EV_CONTACT_WEBHOOK_URL');
    if ($webhook) {
        if (strpos($webhook, 'https://') !== 0) { $respond(503, 'Please email info@evevolutionhealth.com for general inquiries. Do not send medical information.'); }
        $response = wp_remote_post($webhook, array('timeout' => 12, 'headers' => array('Content-Type' => 'application/json'), 'body' => wp_json_encode(array('type' => 'contact', 'name' => $name, 'email' => $email, 'topic' => $topic, 'message' => $message, 'submittedAt' => gmdate('c')))));
        $sent = !is_wp_error($response) && wp_remote_retrieve_response_code($response) >= 200 && wp_remote_retrieve_response_code($response) < 300;
    } else {
        $sent = wp_mail('info@evevolutionhealth.com', 'Website inquiry: ' . $topic, "Name: $name\nEmail: $email\nTopic: $topic\n\n$message", array('Reply-To: ' . $email));
    }
    if (!$sent) { $respond(502, 'We could not send your message. Please email info@evevolutionhealth.com for general inquiries. Do not send medical information.'); }
    $respond(200, 'Your message was accepted for delivery. Our team will follow up by email.');
}
add_action('template_redirect', 'eves_sisters_contact_endpoint', -1850);
HANDLER;
file_put_contents($path, $code);
$style = $theme . '/style.css';
$css = file_get_contents($style);
if (substr_count($css, 'Version: 2.13.5') !== 1) { throw new RuntimeException('Unexpected theme version.'); }
file_put_contents($style, str_replace('Version: 2.13.5', 'Version: 2.13.6', $css));
echo "Staged WordPress handlers patched; theme version 2.13.6.\n";
