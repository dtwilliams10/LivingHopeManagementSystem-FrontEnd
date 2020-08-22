import React, { useState } from "react";
import HeaderBar from "components/headerBar";
import { useHistory } from 'react-router-dom'
import { accountService } from "../../services/account.service";
import { alertService } from "../../services/alert.service";

function Login() {

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
 
    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
        .then(() => {
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
        <form>
            <br/>
            <label>Email Address</label>
            <input
                id="email-address"
                className="form-field"
                type="text"
                placeholder="Please enter your email address"
                name="emailAddress"
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
                value={values.password}
                onChange={handlePasswordInputChange}
            />

            <button
                id="login"
                type="submit"
                className="submit-button"
            >Login</button>
        </form>
        {/*showSuccess && <div className='success-message'>Successfully logged in!</div>*/}
        </div>
    );
};

export default Login;
