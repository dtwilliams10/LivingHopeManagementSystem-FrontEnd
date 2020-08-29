import React, { useState } from 'react';
import HeaderBar from 'components/headerBar';
import { accountService } from '../../services/account.service';
import { useHistory } from 'react-router-dom';
import { alertService } from 'services/alert.service';
import { Form, Button } from 'react-bootstrap';

export default function Registration() {

  const history = useHistory();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  })

  const [validated, setValidated] = useState(false);

  const handleFirstNameChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  }

  const handleLastNameChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  }

  const handleEmailAddressChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  }

  const handlePasswordChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  }

  const handleConfirmPasswordChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      confirmPassword: event.target.value,
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
      setValidated(true);
      accountService
        .register(values)
        .then(() => {
          history.push("/Login");
        })
        .catch((error) => {
          console.log(error);
          alertService.error(error, { keepAfterRouteChange: false });
        });
    }
  };

  return (
    <div>
      <HeaderBar/>
      <br/>
      <div className="registrationForm">
        <Form onSubmit={handleSubmit} validated={validated} noValidate>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="Please enter your first name." onChange={handleFirstNameChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" placeholder="Please enter your last name." onChange={handleLastNameChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="emailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type="email" placeholder="Please enter your email address." onChange={handleEmailAddressChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter your Email Address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Please enter a password" onChange={handlePasswordChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type="password" placeholder="Please confirm your password" onChange={handleConfirmPasswordChange}/>
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button className="register-button" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
        <p>If you already have an account please click <a href="/Login">here</a>.</p>
        <br/>
      </div>
    </div>
  )
}