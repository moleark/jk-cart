/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './css/style.css';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { NavView, start, nav, startPage } from 'tonva';
import { appConfig } from 'configuration';
import './App.css';
import { CApp, CWeb } from './tapp';
//import logo from './logo.svg';

/*
let elRoot = document.getElementById('root');
if (!elRoot) {
	elRoot = document.createElement('div');
	elRoot.style.display = 'none';
	document.body.append(elRoot);
}
ReactDOM.render(<App />, elRoot);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

//let { location } = document;
//if (location.host && false) {

(async function() {
	nav.setSettings(appConfig);
	let onLogined: () => Promise<void>;

	if (nav.isMobile || window.location.pathname.endsWith('/app')) {
		require('style-loader!./css/style.css');
		require('style-loader!./css/rst.css');
		onLogined = async () => {
			await start(CApp, appConfig);
		}
	}
	else {
		require('style-loader!./css/style.css');
		onLogined = async () => {
			await startPage(CWeb, appConfig);
		};
	}

	const App: React.FC = () => {
		return <NavView onLogined={onLogined} notLogined={onLogined} />;
	}

	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);
	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();
