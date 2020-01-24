import React from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SystemReportList from './pages/SystemReport/SystemReportList';
import PersonalDevelopment from './pages/PersonalDevelopment/PersonalDevelopment';
import ErrorPage from './pages/Error';
import { Route, Switch, Redirect } from 'react-router-dom';
import SystemReport from 'pages/SystemReport/Ministry & Involvement/SystemReport';
import Login from 'pages/Login/Login';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SystemReport" component={SystemReportList} />
        <Route exact path="/Home" component={Home} />
        <Route
          exact
          path="/PersonalDevelopment"
          component={PersonalDevelopment}
        />
        <Route exact path="/About" component={About} />
        <Route exact path="/SystemReportForm" component={SystemReport} />
        <Route exact path="/Error" component={ErrorPage} />
        {/* The Redirect needs to be the last route, else it will redirect all requests to the Home page. */}
        if(/*Not a validated user*/)
        {<Redirect path="/" to="Login" />}
        else
        {<Redirect path="/" to="Home" />}
      </Switch>
    </div>
  );
};

export default App;
