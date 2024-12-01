<?php
/**
 * Plugin Name: Color Contrast Suggest
 * Description:
 * Version: 0.0.1
 * Author: William Patton
 * Author URI: https://pattonwebz.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: color-contrast-suggest
 * Domain Path: /languages
 * Requires at least: 6.7
 * Requires PHP: 7.4
 *
 * @package PattonWebz\ColorContrastSuggest
 */

namespace PattonWebz\ColorContrastSuggest;

// Exit if accessed directly.
use PattonWebz\ColorContrastSuggest\ColorContrastSuggest;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'PWCCS_VERSION' ) ) {
	define( 'PWCCS_VERSION', '0.0.1' );
}

if ( ! defined( 'PWCCS_PLUGIN_DIR' ) ) {
	define( 'PWCCS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'PWCCS_PLUGIN_URL' ) ) {
	define( 'PWCCS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'PWCCS_PLUGIN_FILE' ) ) {
	define( 'PWCCS_PLUGIN_FILE', __FILE__ );
}

if ( file_exists( PWCCS_PLUGIN_DIR . 'vendor/autoload.php' ) ) {
	require_once PWCCS_PLUGIN_DIR . 'vendor/autoload.php';
} else {
	add_action(
		'admin_notices',
		function () {
			?>
		<div class="notice notice-error is-dismissible">
			<p><?php esc_html_e( 'Please run composer install in the plugin directory.', 'color-contrast-suggest' ); ?></p>
		</div>
			<?php
		}
	);
	return;
}

( ColorContrastSuggest::get_instance() )->boot();
