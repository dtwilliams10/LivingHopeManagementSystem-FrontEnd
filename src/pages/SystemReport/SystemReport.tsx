import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const endpoint: string = 'values';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

interface SystemReport {
  ReportID: number;
  ReportName: string;
  ReportDate: Date;
  CreatedDate: Date;
  UpdatedDate: Date;
  SystemName: string;
  SystemUpdate: string;
  PersonnelUpdates: string;
  CreativeIdeasAndEvaluations: string;
  BarriersOrChallenges: string;
  HowCanIHelpYou: string;
  PersonalGrowthAndDevelopment: string;
}
class SystemReport extends Component {
  state = {
    SystemReport
  };
  componentDidMount() {
    axios.get(url).then(res => {
      let response = res.data;
      this.setState({ response });
    });
  }

  handleSubmitClick() {
    axios
      .post(process.env.REACT_APP_URL + 'SystemReport')
      .then(function(response) {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="App">
        <HeaderBar />
        <AppBar />
        <div>
          <form>
            <TextField
              multiline={true}
              autoCorrect="true"
              id="System Report Name"
            ></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <TextField multiline={true} autoCorrect="true"></TextField>
            <Button
              variant="contained"
              color="inherit"
              onClick={this.handleSubmitClick}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SystemReport;
