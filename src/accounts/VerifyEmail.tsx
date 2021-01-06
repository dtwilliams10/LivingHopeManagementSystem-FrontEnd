import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string'
import { accountService } from 'services/account.service';
import { alertService } from 'services/alert.service';

function VerifyEmail() {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const history = useHistory();

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {

        const {token} = queryString.parse(window.location.search);

        history.replace(window.location.pathname);

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verification successful, you may now login', { keepAfterRouteChange: true});
                history.push('/Login');
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
//
    }, [EmailStatus, history]);

    function getBody() {
        switch(emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>;
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