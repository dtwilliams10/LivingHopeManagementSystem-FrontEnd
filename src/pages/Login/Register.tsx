import React from 'react';
import HeaderBar from 'components/headerBar';
import { Formik } from 'formik';
import axios from 'axios';
import { authenticationService } from '../../services/authentication.service';
import { Redirect } from 'react-router-dom';

const endpoint: string = 'users/register';
const url: string = process.env.REACT_APP_URL + endpoint;

class RegistrationPage extends React.Component {
  render() {
    if (authenticationService.currentUserValue) {
      return <Redirect to="/Home" />;
    }
    return (
      <div>
        <HeaderBar />
        <br />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log('Registering user: ', values);
              axios
                .post(url, {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  username: values.username,
                  password: values.password
                })
                .then(function(response) {
                  //Need to use this to pass to the login page for the user to use their new credentials
                  console.log(response);
                })
                .catch(function(error) {
                  console.log(error);
                });
              setSubmitting(true);
            }, 500);
          }}

          /* Need to add validation to all the fields */
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
                  className={errors.email && touched.email && 'error'}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  autoComplete="current-username"
                  placeholder="Please enter your username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username && 'error'}
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
                <label htmlFor="username">Password</label>
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
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                {/* Need to redirect to the login page after successful submission */}
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default RegistrationPage;
