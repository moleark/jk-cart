import * as React from 'react';
import './App.css';
import { NavView, nav, start } from "tonva-react";
import { CApp } from './tapp';
import { appConfig } from 'uq-app/appConfig';
import { BrowserRouter as Router } from 'react-router-dom';

//const tonvaApp = "bruce/TestApp";
nav.setSettings(appConfig);

class App extends React.Component {

  private onLogined = async () => {
    await start(CApp, appConfig);
  }
  public render() {
    return <Router>
      <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
    </Router>
  }
}

export default App;