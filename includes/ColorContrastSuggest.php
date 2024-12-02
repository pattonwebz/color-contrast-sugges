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
		// this should be a block instead later.
		add_shortcode( 'color-contrast-suggest', [ $this, 'shortcode' ] );
	}

	/**
	 * Shortcode callback.
	 *
	 * @param array $atts Shortcode attributes.
	 * @return string
	 */
	public function shortcode( $atts ) {
		$atts = shortcode_atts(
			[],
			$atts
		);

		ob_start();
		require 'partials/color-contrast-suggest';
		return ob_get_clean();
	}
}
