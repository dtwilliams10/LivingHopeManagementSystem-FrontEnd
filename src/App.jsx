import React from 'react';
import Home from './pages/Home/Home';
import SystemReport from './pages/SystemReport/SystemReport';
import PersonalDevelopment from './pages/PersonalDevelopment/PersonalDevelopment';
import { Route, Switch, Redirect } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/SystemReport" component={SystemReport} />
        <Route
          exact
          path="/PersonalDevelopment"
          component={PersonalDevelopment}
        />
      </Switch>
    </div>
  );
};

export default App;
