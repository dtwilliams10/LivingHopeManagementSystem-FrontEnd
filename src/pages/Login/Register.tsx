import React, { useState } from 'react';
import HeaderBar from 'components/headerBar';
import { accountService } from '../../services/account.service';
import { useHistory } from 'react-router-dom';
import { alertService } from 'services/alert.service';
import { Form, Button, Col } from 'react-bootstrap';

export default function Registration() {

  const history = useHistory();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

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

  const handleTandCChange = (event) => {
    event.persist();
    console.log(event.target.value);
    if(event.target.value === "on") {
      setValues((values) => ({
        ...values,
        acceptTerms: true
      }));
    } else {
      setValues((values) => ({
        ...values,
        acceptTerms: false
      }));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    accountService.register(values)
    .then(() => {
      history.push('/Login');
    })
    .catch(error => {
      console.log(error);
      alertService.error(error, {keepAfterRouteChange: false});

    })
  }

  return (
    <div>
      <HeaderBar/>
      <br/>
      <div className="registrationForm">
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Please enter your first name." onChange={handleFirstNameChange}/>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Please enter your last name." onChange={handleLastNameChange}/>
          </Form.Group>
          <Form.Group controlId="emailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Please enter your email address." onChange={handleEmailAddressChange}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Please enter a password" onChange={handlePasswordChange}/>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Please confirm your password" onChange={handleConfirmPasswordChange}/>
          </Form.Group>
          <Form.Row>
            <Col xs="auto">
              <Form.Label>I accept the terms and conditions</Form.Label>
            </Col>
            <Col>
              <Form.Check type="checkbox" onChange={handleTandCChange}/>
            </Col>
          </Form.Row>
          <Button onClick={handleSubmit}>
            Register
          </Button>
        </Form>
        <p>If you already have an account please click <a href="/Login">here</a>.</p>
        <br/>
      </div>
    </div>
  )
}