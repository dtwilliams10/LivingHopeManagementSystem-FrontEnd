import React, { useState } from "react";
import HeaderBar from "components/headerBar";
import { useHistory } from 'react-router-dom'
import { accountService } from "../../services/account.service";
import { alertService } from "../../services/alert.service";

export default function Login() {

    const history = useHistory();

    const [submitted, setSubmitted] = useState(false);

    const [values, setValues] = useState({
        emailAddress: '',
        password: '',
    })

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
      event.preventDefault();
      setSubmitted(true);
      alertService.clear();
      accountService.login(values.emailAddress, values.password)
      .then(() => {
          history.push('/Home');
      })
      .catch(error => {
          history.push('/Login');
          alertService.error(error, { keepAfterRouteChange: false });
      });
    };

    return (
        <div>
        <HeaderBar />
        <form className='login-form' onSubmit={handleSubmit}>
            <br/>
            {submitted && !values.emailAddress ? <span id="email-address-error">Please enter your email address</span> : null }
            <label>Email Address</label>
            <input
                id="email-address"
                className="form-field"
                type="text"
                placeholder="Please enter your email address"
                name="emailAddress"
                autoComplete="username"
                value={values.emailAddress}
                onChange={handleEmailAddressInputChange}
            />
            {submitted && !values.password ? <span id="password-error">Please enter a password</span> : null}
            <label>Password</label>
            <input
                id="password"
                className="form-field"
                type="password"
                placeholder="Please enter your password"
                name="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handlePasswordInputChange}
            />

            <button
                id="login"
                type="submit"
                className="submit-button"
            >Login</button>
        </form>
      </div>
    );
};