import React from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SystemReportList from './pages/SystemReport/SystemReportList';
import PersonalDevelopment from './pages/PersonalDevelopment/PersonalDevelopment';
import ErrorPage from './pages/Error';
import Login from './pages/Login/Login';
import RegistrationPage from './pages/Login/Register';
import { Route, Switch, Redirect } from 'react-router-dom';
import { accountService } from 'services/account.service';
import SystemReport from 'pages/SystemReport/SystemReport';
import { VerifyEmail } from 'accounts/VerifyEmail';
import ForgottenPassword from 'pages/Accounts/ForgottenPassword';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/Login" component={Login}/>
        <Route path="/accounts/verify-email" component={VerifyEmail}/>
        <Route path="/accounts/forgot-password" component={ForgottenPassword} />
        <PrivateRoute exact path="/SystemReport">
          <SystemReportList/>
        </PrivateRoute>
        <PrivateRoute exact path="/Home" componenet={Home}>
          <Home/>
        </PrivateRoute>
        <PrivateRoute exact path="/PersonalDevelopment">
          <PersonalDevelopment/>
        </PrivateRoute>
        <PrivateRoute exact path="/About">
          <About/>
        </PrivateRoute>
        <PrivateRoute exact path="/SystemReportForm">
          <SystemReport/>
        </PrivateRoute>
        <Route exact path="/Error" component={ErrorPage}/>
        <Route exact path="/Register">
          <RegistrationPage/>
        </Route>
        <Redirect from="/" to="/Login"/>
      </Switch>
    </div>
  );
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accountService.userValue ? (
        children
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}