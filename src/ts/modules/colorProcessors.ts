/**
 * Convert hex color to RGB
 *
 * @param hex
 */
function hexToRgb(hex: string): { r: number, g: number, b: number } {
	// strip leading # if it's there
	hex = hex.replace(/^#/, '');

	// if the hex value is shorthand, expand it
	if (hex.length === 4) {
		hex = hex.replace(/#(.)(.)(.)/, '#$1$1$2$2$3$3');
	}

	// convert hex to RGB and return it
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return { r, g, b };
}

/**
 * Convert RGB color to hex
 *
 * @param r
 * @param g
 * @param b
 *
 * @returns {string} Hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

/**
 * Calculate luminance of a color in rgb format.
 *
 * @param r
 * @param g
 * @param b
 *
 * @returns {number} Luminance value
 */
function luminance(r: number, g: number, b: number): number {
	const a = [r, g, b].map(v => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


/**
 * Convert RGB to HSL
 *
 * @param r
 * @param g
 * @param b
 */
function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0, s = 0, l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 *
 * @param h
 * @param s
 * @param l
 */
function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
	let r, g, b;

	s /= 100;
	l /= 100;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		h /= 360;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/**
 * Calculate contrast ratio between two hex colors.
 *
 * @param hex1
 * @param hex2
 *
 * @returns {number} Contrast ratio
 */
function contrastRatio(hex1: string, hex2: string): number {
	const rgb1 = hexToRgb(hex1);
	const rgb2 = hexToRgb(hex2);
	const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
	const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
	return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

/**
 * Get text color for a given background hex color.
 *
 * @param hex
 *
 * @returns {string} Text color, either black or white.
 */
function getTextColorForBackground(hex: string): string {
	const rgb = hexToRgb(hex);
	const lum = luminance(rgb.r, rgb.g, rgb.b);
	return lum > 0.179 ? 'black' : 'white';
}

/**
 * Generate a complementary color palette
 *
 * @param hex
 */
function generateComplementaryPalette(hex: string): string[] {
	const { r, g, b } = hexToRgb(hex);
	const complementaryColor = rgbToHex(255 - r, 255 - g, 255 - b);
	return [hex, complementaryColor];
}

/**
 * Generate a split-complementary color palette
 *
 * @param hex
 */
function generateSplitComplementaryPalette(hex: string): string[] {
	const { r, g, b } = hexToRgb(hex);
	const { h, s, l } = rgbToHsl(r, g, b);

	const color1 = hslToRgb((h + 150) % 360, s, l);
	const color2 = hslToRgb((h + 210) % 360, s, l);

	return [hex, rgbToHex(color1.r, color1.g, color1.b), rgbToHex(color2.r, color2.g, color2.b)];
}


/**
 * Generate a triadic color palette with 6 colors
 *
 * @param hex
 * @param offset
 */
function generateTriadicPalette(hex: string, offset: number = 4.5): string[] {
	const { r, g, b } = hexToRgb(hex);
	const { h, s, l } = rgbToHsl(r, g, b);

	const colors = [];
	for (let i = 0; i < 6; i++) {
		const triadHue = ( (h + i * 20) - offset ) % 360;
		const { r, g, b } = hslToRgb(triadHue, s, l);
		colors.push(rgbToHex(r, g, b));
	}

	return colors;
}

export {
	contrastRatio,
	getTextColorForBackground,
	generateComplementaryPalette,
	generateSplitComplementaryPalette,
	generateTriadicPalette
};

