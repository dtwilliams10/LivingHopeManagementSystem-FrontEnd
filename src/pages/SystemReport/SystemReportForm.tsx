import React, { Component } from 'react';
import SystemReportForm from '../../components/SystemReportForm';
import ButtonAppBar from '../../components/ButtonAppBar';

class ReportForm extends Component {
    render() {
        return (
            <>
                <ButtonAppBar/>
                <SystemReportForm/>
            </>
        )
    }
}

export default ReportForm;