import React, { useContext } from 'react';
import { ColorContext, ColorContextProps } from './Contexts/ColorContext';

import ColorTile from './Componants/ColorTile';

import {
	contrastRatio, generateSplitComplementaryPalette,
	generateTriadicPalette
} from '../../ts/modules/colorProcessors';

const App: React.FC = () => {
	const colorContext = useContext(ColorContext);

	if (!colorContext) {
		throw new Error("ColorContext must be used within a ColorProvider");
	}

	const { foreground, background, setForeground, setBackground } = colorContext as ColorContextProps;
	const [contrast, setContrast] = React.useState(0);

	const updateForeground = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForeground(e.target.value);
	};

	const updateBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBackground(e.target.value);
	};

	React.useEffect(() => {
		setContrast(Number(contrastRatio(foreground, background).toFixed(2)));
	}, [foreground, background]);

	React.useEffect(() => {
		setTriadic( generateTriadicPalette(background) );
		setSplit( generateSplitComplementaryPalette(background) );
	}, [ background ]);

	const [ triadic, setTriadic ] = React.useState<string[]>([
		"#ffffff",
		"#000000",
		"#ff0000",
		"#00ff00",
		"#0000ff",
		"#ffff00",
		"#ff00ff",
		"#00ffff"
	]);

	const [ split, setSplit ] = React.useState<string[]>([
		"#ffffff",
		"#000000"
	]);

	return (
		<>
			<h1>Color Contrast Suggest</h1>
			<main>
				<fieldset>
					<legend>Contrast Checker</legend>
					<label>
						Foreground:
						<input type="color" onChange={updateForeground} value={foreground} />
					</label>
					<label>
						Background:
						<input type="color" onChange={updateBackground} value={background} />
					</label>
				</fieldset>
				<section>
					<h2>Contrast Ratio</h2>
					<p style={{ color: contrast < 4.5 ? "red" : "green" }}>{contrast}:1</p>
				</section>
				<section style={{ margin: "20px"}}>
					<h2>Color Tiles</h2>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<ColorTile hexColor={foreground} />
						<ColorTile hexColor={background} />
					</div>
				</section>
				<section style={{ margin: "20px"}}>
					<h2>Color Pallet: Split</h2>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						{ split.map((color, index) => <ColorTile key={index} hexColor={color} />) }
					</div>
				</section>
				<section style={{ margin: "20px"}}>
					<h2>Color Pallet: Tradic</h2>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						{ triadic.map((color, index) => <ColorTile key={index} hexColor={color} />) }
					</div>
				</section>
			</main>
		</>
	);
};

export default App;
