import React, { Component } from 'react';
import axios from 'axios';
import SystemReport from '../SystemReport';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import { Button, TextField } from '@material-ui/core';
import '../../../App.css';

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
        <div id="SystemReportform">
          <form style={{ border: 'solid thin black' }}>
            <TextField
              className="TextField"
              id="ReportName"
              label="Report Name"
              datatype="string"
              multiline={true}
            />
            {/*This will be autofilled with the logged in user once users are integrated*/}
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <Button onClick={this.handleSubmitClick}>
              Submit System Report
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateSystemReport;
