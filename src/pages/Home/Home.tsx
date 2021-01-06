import React, { Component } from 'react';
import AppBar from 'components/AppBar';
import HeaderBar from 'components/headerBar';
import 'App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <AppBar />
        <div className="homePage">
          {/*TODO: Add a personalized welcome using the user name.*/}
          Welcome to the Living Hope Management System.
          <br />
          This system is intended to provide a system of record for all system
          reports and other ministry documentation.
          <br />
          We strive to provide better ministry through better management.
        </div>
      </div>
    );
  }
}
export default Home;
