import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import { ForgotPassword } from 'accounts/ForgottenPassword';

class ForgottenPassword extends Component {
    render () {
        return(
        <div>
            <HeaderBar/>
            <div className="forgottenPassword">
                <ForgotPassword/>
            </div>
        </div>
        )
    }
}

export default ForgottenPassword;