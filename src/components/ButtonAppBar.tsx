import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  createTheme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { NavLink, useHistory } from 'react-router-dom';
import { accountService } from '../services/account.service';

const theme = createTheme({
  palette: {
    primary: grey
  }
});

export default function ButtonAppBar(props: { classes: any }) {
  const { classes } = props;
  const history = useHistory();

  function logoff() {
    accountService.logout();
    history.push('/Login');
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <AppBar position="static" className="App">
          <Toolbar>
            <NavLink to="/Home">
              <Button>Home</Button>
            </NavLink>
            <NavLink to="/SystemReport">
              <Button>System Report</Button>
            </NavLink>
            <NavLink to="/PersonalDevelopment">
              <Button>Personal Development</Button>
            </NavLink>
            <NavLink to="/About">
              <Button>About</Button>
            </NavLink>
            <NavLink to="/Login" className="logout">
              <Button onClick={logoff}>Log Off</Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};