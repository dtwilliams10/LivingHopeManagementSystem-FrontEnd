import React, { Component } from 'react';
import ButtonAppBar from 'components/ButtonAppBar';
import 'App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <div className="homePage">
          {/*TODO: Add a personalized welcome using the user name.*/}
          Hello, {sessionStorage.getItem("userFirstName")} {sessionStorage.getItem("userLastName")}. <br/>Welcome to the Living Hope Management System.
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
