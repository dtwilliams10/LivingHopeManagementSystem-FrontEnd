import React, { Component } from 'react';
import SystemReportForm from '../../components/SystemReportForm';
import ButtonAppBar from '../../components/AppBar';

class SystemReport extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <SystemReportForm />
      </div>
    );
  }
}

export default SystemReport;
