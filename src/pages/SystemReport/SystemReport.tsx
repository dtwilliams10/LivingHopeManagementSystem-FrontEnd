import React, { Component } from 'react';

import axios from 'axios';
import { Button } from '@material-ui/core';
import HeaderBar from 'components/headerBar';
import AppBar from 'components/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_URL + endpoint;
const error: boolean = false;
class SystemReport extends Component {
  state = {
    systemreport: [],
    error
  };
  componentDidMount() {
    var _self = this;
    axios
      .get(url)
      .then(res => _self.setState({ error: false, systemreport: res.data }))
      .catch(function(error) {
        if (error.request) {
          console.log('Error', error.message);
          _self.setState({
            error: true,
            systemreport: []
          });
        }
      });
  }

  render() {
    if (error) {
      return (
        <div>
          <HeaderBar />
          <AppBar />
          <p>No Records.</p>
        </div>
      );
    } else {
      return (
        <div>
          <HeaderBar />
          <AppBar />
          <Button href="/CreateSystemReport">Create New System Report</Button>
          <Paper>
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
                    <TableCell align="center">{row.systemName.name}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {row.systemReportStatus.status}
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
}

export default SystemReport;
