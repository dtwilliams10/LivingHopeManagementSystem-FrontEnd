import React from 'react';
import HeaderBar from 'components/headerBar';
import { Formik } from 'formik';
import { authenticationService } from '../../services/authentication.service';
import { Redirect } from 'react-router-dom';

const endpoint: string = 'Home';
const url: string = process.env.REACT_APP_URL + endpoint;
class LoginPage extends React.Component {
  render() {
    if (authenticationService.currentUserValue) {
      return <Redirect to="/Home" />;
    }

    function checkAuth()
    {
      if(authenticationService.currentUserValue)
      {
        window.location.assign(url);
      }
      else
      {
        return <Redirect push to="/Login"/>
      }
    }

    return (
      <div>
        <HeaderBar />
        <br />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(url);
              authenticationService.login(values.username, values.password);
              setSubmitting(true);
              checkAuth();
              window.location.reload();
            }, 500);
          }
        }

          /* Need to add validation to the email and password fields */
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
              <form onSubmit={handleSubmit} className="Login">
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
                  Login
                </button>
              </form>
            );
          }}
        </Formik>
        <p className="registration-link">
          If you don't have an account yet, please click{' '}
          <a href="/Register">here</a> to register
        </p>
      </div>
    );
  }
}

export default LoginPage;
