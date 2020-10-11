import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { NavView, start, nav, CAppBase, startRoute } from 'tonva';
//import logo from './logo.svg';
import './App.css';
import { CApp } from 'CApp';
import { appConfig } from 'configuration';
import { CAppProduct, CAppProductDetail } from 'product/CAppProduct';

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

let { location } = document;
if (location.host) {
	(async function () {
		function renderDom(div: any) {
			ReactDOM.render(
				<React.StrictMode>
					{div}
				</React.StrictMode>,
				document.getElementById('root')
			);
		}

		function renderCApp(cApp: CAppBase, param?: any, ...params: any[]) {
			const App: React.FC = () => {
				const onLogined = async () => {
					await cApp.start(param, params);
				}
				return <NavView onLogined={onLogined} notLogined={onLogined} />;
			}
			renderDom(<App />);
		}

		nav.on({
			'/search/:key': (params: any, queryStr: any) => {
				renderCApp(new CAppProduct(), params.key);
			},
			'/product/:id': (params: any, queryStr: any) => {
				renderCApp(new CAppProductDetail(), params.id);
			},
			'/a/b': () => {
				renderDom(<div>/a/b <button onClick={() => nav.navigate('/c/d')}>test</button></div>)
			},
			'/c/d': () => {
				renderDom(<div>
					/c/d
					<button onClick={() => nav.navigate('/eeee/a/1?c=1 & d=3')}>test</button>
				</div>)
			},
			'/eeee/:action/:id': (params: any, queryStr: any) => {
				let span: any;
				if (queryStr) {
					span = <span>{queryStr}</span>
				}
				renderDom(<div>/e query:{span}  params:{JSON.stringify(params)}</div>)
			},
			'/bbbb/cccc': () => {
			},
		});
		nav.on(() => {
			renderCApp(new CApp());
		});
		await startRoute(appConfig);

		// If you want your app to work offline and load faster, you can change
		// unregister() to register() below. Note this comes with some pitfalls.
		// Learn more about service workers: https://bit.ly/CRA-PWA
		serviceWorker.unregister();
	})();
}
else {
	(async function () {
		nav.setSettings(appConfig);
		const App: React.FC = () => {
			const onLogined = async () => {
				await start(CApp, appConfig);
			}
			return <NavView onLogined={onLogined} />;
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
}