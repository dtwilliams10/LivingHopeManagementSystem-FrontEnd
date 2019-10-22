import React, { Component } from 'react';

import axios from 'axios';
import { Button } from '@material-ui/core';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
//import TableFooter from '@material-ui/core/TableFooter';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_URL + endpoint;

interface ISystemReport {
  ReportID: number;
  Active: boolean;
  Reporter: string;
  SystemReportStatus: number;
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

//const systemreport = []; //: ISystemReport[] = [];

class SystemReport extends Component {
  state = {
    systemreport: []
  }; /*: ISystemReport = {
    ReportID: 0,
    Active: false,
    Reporter: '',
    SystemReportStatus: 0,
    ReportName: '',
    ReportDate: new Date(),
    CreatedDate: new Date(),
    UpdatedDate: new Date(),
    SystemName: '',
    SystemUpdate: '',
    PersonnelUpdates: '',
    CreativeIdeasAndEvaluations: '',
    BarriersOrChallenges: '',
    HowCanIHelpYou: '',
    PersonalGrowthAndDevelopment: ''*/

  componentDidMount() {
    var _self = this;
    axios
      .get(url)
      .then(res => _self.setState({ systemreport: res.data }))
      .catch(function(error) {
        if (error.request) {
          console.log('Error', error.message);
          _self.setState({
            //TODO: Need to fix this, it doesn't respond properly.
            systemreport:
              'An error ocurred connecting with the API. Please contact an administrator'
          });
        }
      });
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <AppBar />
        <Button href="/CreateSystemReport">Create New System Report</Button>
        <Paper>
          {/*TODO: Need to update this to not display a table if no records are found*/}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Report ID</TableCell>
                <TableCell align="center">System Name</TableCell>
                <TableCell align="center">Reporter</TableCell>
                <TableCell align="center">Report Status</TableCell>
                <TableCell align="center">Updated Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(this.state.systemreport)}
              {this.state.systemreport.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <a href={url + '/' + row.id}>{row.id}</a>
                  </TableCell>
                  <TableCell align="center">{row.systemNameId}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.systemReportStatusId}
                  </TableCell>
                  <TableCell align="center">{row.updatedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default SystemReport;
