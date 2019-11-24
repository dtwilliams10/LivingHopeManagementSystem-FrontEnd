import React, { Component } from 'react';
import axios from 'axios';
import SystemReport from '../SystemReport';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import { Button, TextField } from '@material-ui/core';
import '../../../App.css';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

class CreateSystemReport extends Component {
  state = {
    SystemReport
  };

  handleSubmitClick() {
    axios.post(url).then(function(response) {
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
            {/*TODO: This will be autofilled with the logged in user once users are integrated*/}
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            {/* TODO: Update this to autopopulate with today's date */}
            <TextField
              className="ReportedDate"
              id="ReportedDate"
              type="date"
              label="Reported Date"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
            <TextField
              className="TextField"
              id="ReporterName"
              label="Reporter Name"
              datatype="string"
              multiline={false}
            />
          </form>
          <Button onClick={this.handleSubmitClick}>Submit System Report</Button>
        </div>
      </div>
    );
  }
}

export default CreateSystemReport;