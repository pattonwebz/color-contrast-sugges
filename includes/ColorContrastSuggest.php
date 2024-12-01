<?php
/**
 * Main plugin class.
 *
 * @package EqualizeDigital\ColorColntrastSuggest
 */

namespace PattonWebz\ColorContrastSuggest;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main plugin class.
 */
class ColorContrastSuggest {


	/**
	 * Plugin instance.
	 *
	 * @var ColorContrastSuggest
	 */
	private static $instance = null;

	/**
	 * Get plugin instance.
	 *
	 * @return ColorContrastSuggest
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Boot the plugin.
	 *
	 * @return void
	 */
	public function boot() {
		// stub.
	}
}
