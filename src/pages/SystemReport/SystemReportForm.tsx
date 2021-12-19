import React, { Component } from 'react';
import SystemReportForm from '../../components/SystemReportForm';
import NavBar from '../../components/AppBar'

class ReportForm extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <SystemReportForm/>
            </div>
        )
    }
}

export default ReportForm;