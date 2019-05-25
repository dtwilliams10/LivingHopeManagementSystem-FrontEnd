import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import TextField from '@material-ui/core/TextField';

class SystemReport extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />
        <AppBar />
        <p>This is text for the System Report Page</p>
        <TextField required multiline variant="outlined" />
      </div>
    );
  }
}

export default SystemReport;
