import React, { Component } from 'react';
import LIVINGHOPEwhite from '../LIVINGHOPEwhite.png';

class HeaderBar extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <img src={LIVINGHOPEwhite} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the Living Hope Management System
          </h1>
          <h3 className="App-subtitle">
            Better ministry through better management
          </h3>
        </header>
      </div>
    );
  }
}

export default HeaderBar;
