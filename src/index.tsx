import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from 'App';

let divMount = document.getElementById('root') || document.getElementById('login');
ReactDOM.render(<App />, divMount);
/*
if (divRoot) {
}

let divLogin = document.getElementById('login');
if (divLogin) {
    ReactDOM.render(<AppLogin />, divLogin);
}
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
