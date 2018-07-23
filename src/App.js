import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Living Hope Management System</h1>
        </header>
        <form>
          <label>
            System Report:
              <input type="textarea"/>
            </label>
        </form>
      </div>
    );
  }
}

export default App;
