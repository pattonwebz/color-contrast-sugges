import React from 'react';
import ReactDOM from 'react-dom';
import { ColorProvider } from './src/Contexts/ColorContext';
import App from './src/App';

ReactDOM.render(
	<ColorProvider>
		<App />
	</ColorProvider>,
	document.getElementById('root')
);
