import React, { FC } from 'react';

import { getTextColorForBackground } from '../../../ts/modules/colorProcessors';

interface ColorTileProps {
	hexColor: string;
}

const ColorTile: FC<ColorTileProps> = ({ hexColor = '#000000' }) => {
	return (
		<div className="colorTile" style={{ width: "100px", height: "100px" }}>
			<div style={{ backgroundColor: hexColor, width: "60px", height: "60px", margin: "20px auto" }}></div>
			<p>Hex: { hexColor }</p>
			<p>Text: { getTextColorForBackground( hexColor) }</p>
		</div>
	);
};

export default ColorTile;
