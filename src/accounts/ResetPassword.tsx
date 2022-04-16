import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string'
import { accountService } from 'services/account.service';
import { alertService } from 'services/alert.service';
import { Form, Button } from 'react-bootstrap';
import { getEnabledCategories } from 'trace_events';

function ResetPassword() {

    let password:string, confirmPassword:string = "";

    const history = useHistory();

    const [validated, setValidated] = useState(false);

    //eslint-disable-next-line
    const PasswordStatus = {
        Verifying: 'Verifying',
        Verified: 'Verified',
        Failed: 'Failed'
    }

    const [passwordStatus, setPasswordStatus] = useState(PasswordStatus.Verifying);

    useEffect(() => {

        //const {token} = queryString.parse(window.location.search);
        //This is being called every time the component loads. Need to stop calling once the email status changes.
        //history.replace(window.location.pathname);
        // accountService.resetPassword(token, password, confirmedPassword)
        //     .then(() => {
        //         alertService.success('Verification successful, you may now login', { keepAfterRouteChange: true});
        //         setEmailStatus(EmailStatus.Verified);
        //         console.log(emailStatus);
        //     })
        //     .catch(() => {
        //         setEmailStatus(EmailStatus.Failed);
        //     });
//eslint-disable-next-line
    }, []);

    const handlePassword = (event) => {

    }

    const handlConfirmPassword = (event) => {

    }

    const checkPasswordsMatch = (password:string, confirmPassword:string) => {
        if(password !== confirmPassword)
        {
            setValidated(false);
            getBody();
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        checkPasswordsMatch(password, confirmPassword);
    }

    function getBody() {
        switch(passwordStatus) {
            case PasswordStatus.Verifying:
                return <div>Verifying...</div>;
            case PasswordStatus.Verified:
                return <div>Your email has been verified! Please go to <Link to="/Login">login</Link></div>
            case PasswordStatus.Failed:
                return <div>Verification failed. You can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>
        }
    }

    return (
        <Form onSubmit={handleSubmit} validated={validated} noValidate>
            <br/>
            <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type="text" placeholder="Please enter your email address" onChange={handlePassword}/>
                <Form.Control.Feedback type="invalid">
                    Please enter your email address.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Button className="forgotten-password-button" type="submit">
                    Reset Password
                </Button>
            </Form.Group>
        </Form>
    )
}

export { ResetPassword }