<?php
/**
 * Plugin Name: ES Lockdown
 * Description: LegitScript lockdown for evevolutionhealth.com — no core sitemaps, no anonymous wp/v2 REST, retired routes answer 404, /sitemap.xml lists only live routes.
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
	return array('', '/care', '/care/longevity-healthspan', '/care/recovery-rejuvenation', '/peptide-care', '/care/weight-management', '/care/hormones-menopause', '/care/skin-beauty', '/eves-secret', '/treatments', '/packages/mrs-collection', '/packages/mrs-jones', '/packages/mrs-golden', '/packages/mrs-robinson', '/about', '/contact', '/faq', '/privacy-policy', '/terms-of-service', '/telehealth-consent', '/subscription-cancellation', '/hipaa-policy', '/disclaimer');
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

	$retired = '#^/(shop|cart|checkout|my-account|get-started)(/|$)|^/wp-sitemap#';
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
