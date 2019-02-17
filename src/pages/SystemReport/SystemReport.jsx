import React, { Component } from 'react';
import HeaderBar from '../../components/headerBar';
import AppBar from '../../components/AppBar';

class SystemReport extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <AppBar />
        <p>This is text for the System Report Page</p>
      </div>
    );
  }
}

export default SystemReport;
