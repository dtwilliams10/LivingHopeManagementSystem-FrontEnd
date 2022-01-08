import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { createBrowserHistory } from 'history';
import { VerifyEmail } from 'accounts/VerifyEmail';
import { ResetPassword } from 'accounts/ResetPassword';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SystemReportForm from './components/SystemReportForm';
import PersonalDevelopment from './pages/PersonalDevelopment/PersonalDevelopment';
import ErrorPage from './pages/Error';
import Login from './pages/Login/Login';
import RegistrationPage from './pages/Login/Register';
import ForgottenPassword from './pages/Accounts/ForgottenPassword';
import SystemReport from './pages/SystemReport/SystemReport';
import HeaderBar from 'components/headerBar';

import { Role } from './helpers/role'

export const history = createBrowserHistory();

export default function App() {
  return (
      <Router history={history}>
        <HeaderBar/>
        <Switch>
          <Route exact path="/Login" component={Login}/>
          <Route path="/accounts/verify-email" component={VerifyEmail}/>
          <Route path="/accounts/forgot-password" component={ForgottenPassword} />
          <Route path="/accounts/reset-password" component={ResetPassword}/>
          <PrivateRoute exact path="/SystemReport" roles={[Role.Admin || Role.User]} component={SystemReport} />
          <PrivateRoute exact path="/Home" roles={[Role.Admin || Role.User]} component={Home}/>
          <PrivateRoute exact path="/PersonalDevelopment" roles={[Role.Admin || Role.User]} component={PersonalDevelopment}/>
          <PrivateRoute exact path="/About" roles={[Role.Admin || Role.User]} component={About}/>
          <PrivateRoute exact path="/SystemReportForm" roles={[Role.Admin || Role.User]} component={SystemReportForm}/>
          <Route exact path="/Error" component={ErrorPage}/>
          <Route exact path="/Register" component={RegistrationPage}/>
          <Route path="/" component={Login}/>
          <Route path="*" component={ErrorPage}/>
        </Switch>
      </Router>
    );
};