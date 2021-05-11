import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './App.css';
import 'antd/dist/antd.css';
import 'css/style.css';
import 'css/rst.css';
import reportWebVitals from './reportWebVitals';
import { CApp, CWeb } from 'uq-app';
import { env, nav, NavView, start, startPage } from 'tonva-react';
import { appConfig } from 'uq-app/appConfig';
import * as qs from 'querystringify';
import { GLOABLE } from 'global';

(async function () {
	nav.setSettings(appConfig);
	let onLogined: () => Promise<void>;

	if (env.isMobile || window.location.pathname.endsWith('/app')) {
		//require('style-loader!./css/style.css');
		//require('style-loader!./css/rst.css');
		onLogined = async () => {
			await start(CApp, appConfig);
		}
	}
	else {
		//require('style-loader!./css/style.css');
		//loadQQScript();
		onLogined = async () => {
			await startPage(CWeb, appConfig);
		};
	}

	let userPassword = async () => {
		let { search } = window.location;
		if (search) {
			let query: any = qs.parse(search.toLowerCase());
			if (search.startsWith('?lgtk=')) {
				let result = await fetch(GLOABLE.EPEC.AUTOLOGIN + '?lgtk=' + query?.lgtk);
				if (result.ok) {
					let res = await result.json();
					return res;
				};
			};
		};
		return; /* { user: 'xxxx', password: 'xxxxx' }; */
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
	//serviceWorker.unregister();
	reportWebVitals();
})();

function loadQQScript() {
	let f = document.createElement("script");
	f.setAttribute("id", "qd30090316631c3780361b3caa2f8195e48a7a2bd5c5");
	f.type = "text/javascript";
	f.src = 'https://wp.qiye.qq.com/qidian/3009031663/1c3780361b3caa2f8195e48a7a2bd5c5';
	// f.src = 'https://wpa.b.qq.com/cgi/wpa.php?key=XzkzODAzNjk3OV80OTI2NjBfNDAwNjY2Nzc4OF8';
	document.body.appendChild(f);
};

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/