import * as React from 'react';
import './App.css';
import { NavView, nav, start } from 'tonva';
import { CApp } from 'CApp';
import { appConfig } from 'configuration';
import { BrowserRouter, Link } from 'react-router-dom';

//const tonvaApp = "bruce/TestApp";
nav.setSettings(appConfig);

class App extends React.Component {

  private onLogined = async () => {
    await start(CApp, appConfig);
  }
  public render() {
    return <BrowserRouter>
      <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
    </BrowserRouter>
  }
}

export default App;