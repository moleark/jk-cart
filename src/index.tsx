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
import * as qs from 'querystringify';
import { GLOABLE } from 'global';
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
    loadBaiduTongji();
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
        require('style-loader!./css/extra_web.css');
        loadQQScript();
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
        document.body.appendChild(elRoot);
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
    f.setAttribute("id", "qd30090316631c3780361b3caa2f8195e48a7a2bd5c5");
    f.type = "text/javascript";
    f.src = 'https://wp.qiye.qq.com/qidian/3009031663/1c3780361b3caa2f8195e48a7a2bd5c5';
    // f.src = 'https://wpa.b.qq.com/cgi/wpa.php?key=XzkzODAzNjk3OV80OTI2NjBfNDAwNjY2Nzc4OF8';
    document.body.appendChild(f);
};

function loadBaiduTongji() {
    var _hmt: any[] = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?581e8230afda2afbd8a5870fad068d1e";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}