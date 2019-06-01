import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const theme = createMuiTheme({
  palette: {
    primary: grey
  }
});

function ButtonAppBar(props: { classes: any }) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
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
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
