<?php
/**
 * The main partial for rendering the frontend base for the color contrast suggest plugin.
 */

?>

<section id="color-contrast-suggest">
	<h2><?php esc_html_e( 'Color Contrast Suggest', 'color-contrast-suggest' ); ?></h2>
	<p><?php esc_html_e( 'This is the frontend for the color contrast suggest plugin.', 'color-contrast-suggest' ); ?></p>

	<fieldset>
		<legend><?php esc_html_e( 'Color Contrast Compare', 'color-contrast-suggest' ); ?></legend>
		<label>
			<?php esc_html_e( 'Foregrund Color:', 'color-contrast-suggest' ); ?>
			<input type="color" id="foreground-color-input" value="#000000">
		</label>
		<label>
			<?php esc_html_e( 'Background Color:', 'color-contrast-suggest' ); ?>
			<input type="color" id="background-color-input" value="#ffffff">
		</label>
	</fieldset>

	<p aria-live="polite" id="color-contrast-suggest-output"><?php esc_html_e( 'Contrast Ratio is: ', 'color-contrast-suggest' ); ?> <span id="contrast-ratio">21:1</span></p>

	<fieldset>
		<legend><?php esc_html_e( 'Color Contrast Suggest', 'color-contrast-suggest' ); ?></legend>
		<label for="color-contrast-suggest-input"><?php esc_html_e( 'Enter a color:', 'color-contrast-suggest' ); ?></label>
		<input type="color" id="color-contrast-suggest-input" name="color-contrast-suggest-input" value="" />
		<button id="color-contrast-suggest-button"><?php esc_html_e( 'Suggest', 'color-contrast-suggest' ); ?></button>
		<p id="color-contrast-suggest-output"></p>
	</fieldset>
</section>


<section id="color-contrast-suggest">
	<h2>Color Contrast Suggest</h2>
	<p>This is the frontend for the color contrast suggest plugin.</p>

	<fieldset>
		<legend>Color Contrast Compare</legend>
		<label>
			Foregrund Color:
			<input type="color" id="foreground-color-input" value="#000000">
		</label>
		<label>
			Background Color:
			<input type="color" id="background-color-input" value="#ffffff">
		</label>
	</fieldset>

	<p aria-live="polite" id="color-contrast-suggest-output">Contrast Ratio is: <span id="contrast-ratio">21:1</span></p>

	<fieldset>
		<legend>Color Contrast Suggest</legend>
		<label for="color-contrast-suggest-input">Enter a color:</label>
		<input type="color" id="color-contrast-suggest-input" name="color-contrast-suggest-input" value="" />
		<button id="color-contrast-suggest-button">Suggest</button>
		<p id="color-contrast-suggest-output"></p>
	</fieldset>
</section>
