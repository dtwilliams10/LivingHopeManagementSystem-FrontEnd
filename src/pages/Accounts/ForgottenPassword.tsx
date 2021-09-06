import React, { Component } from 'react';
import { ForgotPassword } from 'accounts/ForgottenPassword';

class ForgottenPassword extends Component {
    render () {
        return(
            <div className="forgottenPassword">
                <ForgotPassword/>
            </div>
        )
    }
}

export default ForgottenPassword;