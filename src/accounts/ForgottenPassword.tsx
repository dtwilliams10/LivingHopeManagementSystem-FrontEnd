import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { accountService } from 'services/account.service';
import { alertService } from 'services/alert.service';
import { Form, Button } from 'react-bootstrap';

export default function ForgotPassword() {

    const history = useHistory();

    const [values, setValues] = useState({
        email: ''
    })

    const [validated, setValidated] = useState(false);

    const handleEmailAddress = (event) => {
        event.persist();
        setValues((values) => ({
          ...values,
          email: event.target.value,
        }));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            setValidated(true);
        }
        alertService.clear();
        accountService.forgotPassword(values.email)
            .then(() => {
                alertService.success('Please check your email for password reset instructions', { keepAfterRouteChange: false});
                history.push("/");
            })
            .catch((error) => {
                alertService.error(error, { keepAfterRouteChange: false})
            })
    }

    return (
        <Form onSubmit={handleSubmit} validated={validated} noValidate>
            <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type="text" placeholder="Please enter your email address" onChange={handleEmailAddress}/>
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

export { ForgotPassword };