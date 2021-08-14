import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import { accountService } from 'services/account.service';
import { alertService } from 'services/alert.service';

function VerifyEmail() {
    //eslint-disable-next-line
    const EmailStatus = {
        Verifying: 'Verifying',
        Verified: 'Verified',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {

        const {token} = queryString.parse(window.location.search);
        //This is being called every time the component loads. Need to stop calling once the email status changes.
        //history.replace(window.location.pathname);
        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verification successful, you may now login', { keepAfterRouteChange: true});
                setEmailStatus(EmailStatus.Verified);
                console.log(emailStatus);
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });

    }, []);

    function getBody() {
        switch(emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>;
            case EmailStatus.Verified:
                return <div>Your email has been verified! Please go to <Link to="/Login">login</Link></div>
            case EmailStatus.Failed:
                return <div>Verification failed. You can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>
        }
    }

    return (
        <div>
            <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { VerifyEmail }