import React from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SystemReport from './pages/SystemReport/SystemReport';
import PersonalDevelopment from './pages/PersonalDevelopment/PersonalDevelopment';
import { Route, Switch, Redirect } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/SystemReport" component={SystemReport} />
        <Route
          exact
          path="/PersonalDevelopment"
          component={PersonalDevelopment}
        />
        <Route exact path="/About" component={About} />

        {/* The Redirect needs to be the last route, else it will redirect all requests to the Home page. */}
        <Redirect path="/" to="Home" />
      </Switch>
    </div>
  );
};

export default App;
