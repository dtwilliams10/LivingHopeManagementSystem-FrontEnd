import React, { Component } from 'react';
import logo from '../LIVINGHOPEwhite.png';

class HeaderBar extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the Living Hope Management System
          </h1>
          <h3>Better ministry through better management</h3>
        </header>
      </div>
    );
  }
}

export default HeaderBar;
