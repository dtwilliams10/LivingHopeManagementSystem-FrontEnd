import React from "react";
import HeaderBar from "components/headerBar";
import { useHistory } from 'react-router-dom'
import { accountService } from "../../services/account.service";
import { alertService } from "../../services/alert.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {

  const history = useHistory();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required('Password is required')
  });

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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h3 className="card-header">Login</h3>
            <div className="card-body">
              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Login
                  </button>
                  <p className="registration-link">
                    If you don't have an account yet, please click{" "}<a href="/Register">here</a> to register
                  </p>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
