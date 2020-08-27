import React, { useState } from "react";
import HeaderBar from "components/headerBar";
import { useHistory } from 'react-router-dom'
import { accountService } from "../../services/account.service";
import { alertService } from "../../services/alert.service";

export default function Login() {

    const history = useHistory();

    const [values, setValues] = useState({
        emailAddress: '',
        password: '',
    })

    const [submitted, setSubmitting] = useState(false);

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
        alertService.clear();
        accountService.login(values.emailAddress, values.password)
        .then(() => {
            setSubmitting(true);
            history.push('/Home');
        })
        .catch(error => {
            setSubmitting(false);
            history.push('/Login');
            alertService.error(error, { keepAfterRouteChange: false });
        });
    };

    return (
        <div>
        <HeaderBar />
        {/*submitted && <div className='success-message'>Successfully logged in!</div>*/}
        <form className='login-form' onSubmit={handleSubmit}>
            <br/>
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