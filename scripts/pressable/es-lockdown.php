<?php
/**
 * Plugin Name: ES Lockdown
 * Description: LegitScript lockdown for evevolutionhealth.com — no core sitemaps, no anonymous wp/v2 REST, retired routes answer 404, care routes redirect to the telehealth site, /sitemap.xml lists only live routes.
 *
 * Source: scripts/pressable/es-lockdown.php in shooper909-byte/ev-revolution.
 * Installed at wp-content/mu-plugins/es-lockdown.php on the Pressable site.
 */

if (!defined('ABSPATH')) {
	exit;
}

add_filter('wp_sitemaps_enabled', '__return_false');

/* Anonymous requests to the core wp/v2 REST routes get 401. The front end does
 * not use wp/v2; logged-in users (and Jetpack's signed requests) still work. */
add_filter('rest_authentication_errors', function ($result) {
	if (!empty($result) || is_user_logged_in()) {
		return $result;
	}
	$path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
	$route = isset($_GET['rest_route']) ? (string) $_GET['rest_route'] : '';
	if (preg_match('#/wp-json/wp/v2(/|$)#', $path) || preg_match('#^/?wp/v2(/|$)#', $route)) {
		return new WP_Error('rest_not_logged_in', 'Authentication required.', array('status' => 401));
	}
	return $result;
});

function es_lockdown_live_routes() {
	return array('', '/about', '/contact', '/faq', '/privacy-policy', '/terms-of-service', '/telehealth-consent', '/subscription-cancellation', '/hipaa-policy', '/disclaimer');
}

/* Care now lives on the telehealth site. Keep in step with src/lib/telehealth.ts:
 * switch the origin to https://evevolutionwellness.com once that domain serves
 * the app, and send each route to its matching page once deep links work. */
define('ES_TELEHEALTH_ORIGIN', 'https://eve-sisters.vercel.app');

function es_lockdown_handoff_url($path) {
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
	if (isset($legacy[$path])) {
		$path = $legacy[$path];
	}
	if (!preg_match('#^/(care|treatments|peptide-care|eves-secret|packages|pillars)(/|$)#', $path)) {
		return '';
	}
	return ES_TELEHEALTH_ORIGIN . '/?' . http_build_query(array(
		'utm_source' => 'evevolutionhealth',
		'utm_medium' => 'referral',
		'utm_campaign' => 'handoff',
		'utm_content' => str_replace('/', '-', trim($path, '/')),
	));
}

/* Retired routes answer 404 (with or without a trailing slash), and
 * /sitemap.xml lists only the live routes. Runs before WooCommerce and the
 * theme get a chance to redirect or render. */
add_action('init', function () {
	if (is_admin() || (defined('WP_CLI') && WP_CLI) || wp_doing_ajax()) {
		return;
	}
	$path = '/' . trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');

	if ($path === '/sitemap.xml') {
		status_header(200);
		header('Content-Type: application/xml; charset=UTF-8');
		$base = 'https://evevolutionhealth.com';
		echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
		echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
		foreach (es_lockdown_live_routes() as $route) {
			echo '<url><loc>' . esc_url($base . $route) . '</loc></url>' . "\n";
		}
		echo '</urlset>';
		exit;
	}

	$handoff = es_lockdown_handoff_url($path);
	if ($handoff !== '') {
		/* Temporary while every route lands on the telehealth homepage. */
		nocache_headers();
		wp_redirect($handoff, 307);
		exit;
	}

	$retired = '#^/(shop|cart|checkout|my-account|get-started|journal)(/|$)|^/wp-sitemap#';
	if (preg_match($retired, $path)) {
		status_header(404);
		nocache_headers();
		$page = get_template_directory() . '/static-pages/404.html';
		if (is_readable($page)) {
			header('Content-Type: text/html; charset=UTF-8');
			readfile($page);
		} else {
			echo 'Not found';
		}
		exit;
	}
}, 0);

add_filter('robots_txt', function ($output) {
	$output = preg_replace('/^Sitemap:.*$/mi', '', $output);
	return rtrim($output) . "\n\nSitemap: https://evevolutionhealth.com/sitemap.xml\n";
}, 99);
