import {
	contrastRatio,
	generateComplementaryPalette,
	generateSplitComplementaryPalette, generateTriadicPalette,
	getTextColorForBackground
} from "./modules/colorProcessors";

const bindListeners = () => {
	  const foreground = document.getElementById('foreground-color-input');
	  const background = document.getElementById('background-color-input');

	  console.log(foreground);
	  console.log(background);

	  foreground?.addEventListener('change', updateContrast);
	  background?.addEventListener('change', updateContrast);
}

const updateContrast = () => {

	console.log('updateContrast');
	  const foreground = document.getElementById('foreground-color-input') as HTMLInputElement;
	  const background = document.getElementById('background-color-input') as HTMLInputElement;
	  const contrast = document.getElementById('contrast-ratio') as HTMLElement;

	  const ratio = contrastRatio(foreground.value, background.value);
	  contrast.textContent = ratio.toFixed(2) + ':1';

	  console.log( getTextColorForBackground(background.value) );

	const palette = generateComplementaryPalette(background.value);
	console.log(`Complementary palette: ${palette}`);

	const splitPalette = generateSplitComplementaryPalette(background.value);
	console.log(`Split-complementary palette: ${splitPalette}`);

	const triadicPalette = generateTriadicPalette(background.value);
	console.log(`Triadic palette: ${triadicPalette}`);
}

bindListeners();
