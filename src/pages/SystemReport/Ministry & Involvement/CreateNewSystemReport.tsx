import React, { Component } from 'react';
import axios from 'axios';
import SystemReport from '../SystemReport';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import { Button } from '@material-ui/core';

const endpoint: string = 'systemreport';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

class CreateSystemReport extends Component {
  state = {
    SystemReport
  };

  handleSubmitClick() {
    axios
      .post(process.env.REACT_APP_URL + 'SystemReport')
      .then(function(response) {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <AppBar />
        <Button onClick={this.handleSubmitClick}>Submit System Report</Button>
      </div>
    );
  }
}

export default CreateSystemReport;
