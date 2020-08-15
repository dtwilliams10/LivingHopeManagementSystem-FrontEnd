import React from 'react';
import HeaderBar from 'components/headerBar';
import { Formik } from 'formik';
import axios from 'axios';
import { accountService } from '../../services/account.service';
import { Redirect } from 'react-router-dom';

const endpoint: string = 'accounts/register';
const url: string = process.env.REACT_APP_AAS + endpoint;

class RegistrationPage extends React.Component {
  render() {
    if (accountService.userValue) {
      return <Redirect to="/Home" />;
    }

    function redirectPage(page) {
      window.location.href = page;
    }

    return (
      <div>
        <HeaderBar />
        <br />
        <div className="registrationForm">
        <Formik
          initialValues={{
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log('Registering user: ', values);
              axios
                .post(url, {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  acceptTerms: values.acceptTerms
                })
                .then(function() {
                  redirectPage('/Login');
                })
                .catch(function(error) {
                  console.log(error);
                  //TODO: Need to add an onscreen notification for errors
                });
              setSubmitting(true);
            }, 500);
          }}

          /* TODO: Need to add validation to all the fields */
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  placeholder="Please enter your first name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.firstName && touched.firstName && 'error'}
                />
                {errors.firstName && touched.firstName && (
                  <div className="input-feedback">{errors.firstName}</div>
                )}

                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  placeholder="Please enter your last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastName && touched.lastName && 'error'}
                />

                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
                <label htmlFor="email">E-Mail Address</label>
                <input
                  name="email"
                  type="text"
                  autoComplete="email"
                  placeholder="Please enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email && 'error'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Please enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password && 'error'}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Please confirm your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword && touched.confirmPassword && 'error'}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
                <label htmlFor="acceptTerms">I agree to the terms and conditions</label>
                <input
                  name="acceptTerms"
                  type="checkbox"
                  value={values.acceptTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.acceptTerms && touched.acceptTerms && 'error'}
                  />
                  {errors.acceptTerms && touched.acceptTerms && (
                  <div className="input-feedback">{errors.acceptTerms}</div>
                )}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                {/* TODO: Need to redirect to the login page after successful submission */}
                <p className="registration-link">
                  If you already have an account please click{' '}
                  <a href="/Login">here</a> to login.
                </p>
              </form>
            );
          }}
        </Formik>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
