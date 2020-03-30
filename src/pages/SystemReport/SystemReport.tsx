import React, { Component } from 'react';
import SystemReportForm from 'pages/SystemReport/SystemReportForm';
import HeaderBar from 'components/headerBar';
import ButtonAppBar from 'components/AppBar';

class SystemReport extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <ButtonAppBar />
        <SystemReportForm />
      </div>
    );
  }
}

export default SystemReport;
