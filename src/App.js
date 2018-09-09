import React, { Component } from 'react';
//import RTF from './RTF.js';
import MyUsers from './users.js';
import logo from './LIVINGHOPEwhite.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the Living Hope Management System
          </h1>
        </header>
        <MyUsers />
      </div>
    );
  }
}
export default App;
