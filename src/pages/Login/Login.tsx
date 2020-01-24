import React from 'react';
import HeaderBar from 'components/headerBar';
import { Formik } from 'formik';

const endpoint: string = 'Register';
const url: string = 'http://localhost:5004/' + endpoint;

const validatedLoginForm = () => (
  <div>
    <HeaderBar />
    <br />
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log('Logging in', values);
          setSubmitting(false);
        }, 500);
      }}

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Please enter your email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && 'error'}
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
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
      If you don't have an account yet, please click <a href={url}>here</a> to
      register
    </p>
  </div>
);

export default validatedLoginForm;
