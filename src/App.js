import React, { Component } from 'react';
import RTF from './components/RTF.js';
import MyUsers from './components/users';
import logo from './LIVINGHOPEwhite.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the Living Hope Management System
          </h1>
        </header>
        <RTF />
        <MyUsers />
        <p className="systemstatus">{this.state.apiResponse}</p>
        <p className="systemStatus">{this.state.dbResponse}</p>
      </div>
    );
  }
}
export default App;
