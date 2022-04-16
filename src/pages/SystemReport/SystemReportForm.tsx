import React, { Component } from 'react';
import SystemReportForm from '../../components/SystemReportForm';
import ButtonAppBar from '../../components/ButtonAppBar';

class ReportForm extends Component {
    render() {
        return (
            <div>
                <ButtonAppBar/>
                <SystemReportForm/>
            </div>
        )
    }
}

export default ReportForm;