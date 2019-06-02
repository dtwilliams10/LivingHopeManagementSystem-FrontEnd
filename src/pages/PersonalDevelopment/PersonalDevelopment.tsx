import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';

class PersonalDevelopment extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />
        <AppBar />
        <p>This is text for the Personal Development Page</p>
      </div>
    );
  }
}

export default PersonalDevelopment;
