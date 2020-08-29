import React, { useState } from "react";
import HeaderBar from "components/headerBar";
import { useHistory } from 'react-router-dom'
import { accountService } from "../../services/account.service";
import { alertService } from "../../services/alert.service";
import { Form, Button } from "react-bootstrap";

export default function Login() {

    const history = useHistory();

    const [values, setValues] = useState({
        emailAddress: '',
        password: '',
    })

    const [validated, setValidated] = useState(false);

    const handleEmailAddressInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            emailAddress: event.target.value,
        }));
    }

    const handlePasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            password: event.target.value,
        }));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
        event.preventDefault();
        alertService.clear();
        accountService.login(values.emailAddress, values.password)
        .then(() => {
            history.push('/Home');
        })
        .catch(error => {
            alertService.error(error, { keepAfterRouteChange: false });
            history.push('/Login');
        });
    };
}

    return (
      <div>
        <HeaderBar />
        <div className="loginForm">
          <br/>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="emailAddress">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Please enter your email address."
                onChange={handleEmailAddressInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Please enter your password"
                onChange={handlePasswordInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="login-button" type="submit" >
                Login
            </Button>
          </Form>
        </div>
        <br/>
        <div className="registration-link">
          If you don't have an account, please register for one{" "}
          <a href="/Register">here</a>.
        </div>
        <br/>
        <div className="registration-link">If you have forgotten your password, please click <a href="/ForgotPassword">here</a>.</div>
      </div>
    );
};