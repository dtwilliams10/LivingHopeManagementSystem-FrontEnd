import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import TextField from '@material-ui/core/TextField';

const endpoint: string = 'values';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);
class SystemReport extends Component {
  componentWillMount() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        console.log(response.length);
        this.setState({ systemReport: response });
      });
  }

  render() {
    const SystemReport = JSON.stringify(this.state);
    return (
      <div className="App">
        <HeaderBar />
        <AppBar />
        <p>This is text for the System Report Page</p>
        <TextField required multiline variant="outlined" />
        <p />
        {SystemReport}
      </div>
    );
  }
}

export default SystemReport;
