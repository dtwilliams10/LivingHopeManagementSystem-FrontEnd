import React, { Component } from 'react';

import axios from 'axios';
import { Button } from '@material-ui/core';
import { authHeader } from 'helpers/auth-header';
import  ButtonAppBar from 'components/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_API + endpoint;
const style = {
  color: 'black',
  textDecoration: 'none'
};
var error: boolean = false;
class SystemReportList extends Component {
  state = {
    systemreport: [],
    error
  };

  componentDidMount() {
    var _self = this;
    const headers = authHeader();
    axios
      .get(url, { headers: headers })
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

  /* This only work if error is defaulted to true, which it is not. Need to work on error handling before render */
  render() {
    if (this.state.error) {
      return (
        <div>
          <ButtonAppBar />
          <p>No Records.</p>
        </div>
      );
    } else {
      return (
        <div>
          <ButtonAppBar />
          <NavLink to="/SystemReportForm">
              <Button>Create New System Report</Button>
          </NavLink>
          <Paper>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Report ID</TableCell>
                  <TableCell align="center">Report Name</TableCell>
                  <TableCell align="center">System Name</TableCell>
                  <TableCell align="center">Reporter</TableCell>
                  <TableCell align="center">Report Status</TableCell>
                  <TableCell align="center">Updated Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.systemreport.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <Button style={style} href={url + '/' + row.id}>
                        {row.id}
                      </Button>
                    </TableCell>
                    <TableCell align="center">{row.reportName}</TableCell>
                    <TableCell align="center">{row.systemName.name}</TableCell>
                    <TableCell align="center">{row.reporterName}</TableCell>
                    <TableCell align="center">
                      {row.systemReportStatus.status}
                    </TableCell>
                    <TableCell align="center">{row.updatedDate}</TableCell>
                    {/*<TableCell align="center">{Date.parse(row.createdDate)}</TableCell>*/}
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

export default SystemReportList;
