import React from 'react';
import Home from './pages/Home/home';
import SystemReport from './pages/SystemReport/SystemReport';
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
      </Switch>
    </div>
  );
};

export default App;
