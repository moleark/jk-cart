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
import 'antd/dist/antd.css';
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

(async function () {
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
		loadQQScript();
		onLogined = async () => {
			await startPage(CWeb, appConfig);
		};
	}

	let userPassword = async () => {
		return { user: 'xxxx', password: 'xxxxx' };
	}

	const App: React.FC = () => {
		return <NavView onLogined={onLogined} notLogined={onLogined} userPassword={userPassword} />;
	}


	let elRoot = document.getElementById('root');
	if (!elRoot) {
		elRoot = document.createElement('div');
		elRoot.style.display = 'none';
		document.body.append(elRoot);
	}
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		elRoot
	);
	// document.getElementById('root')
	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();

function loadQQScript() {
	let f = document.createElement("script");
	f.type = "text/javascript";
	f.src = 'https://wpa.b.qq.com/cgi/wpa.php?key=XzkzODAzNjk3OV80OTI2NjBfNDAwNjY2Nzc4OF8';
	document.body.appendChild(f);
};