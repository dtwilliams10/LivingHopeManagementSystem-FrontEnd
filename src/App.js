import React, { Component } from 'react';
import RTF from './components/RTF.js';
import MyUsers from './components/users';
import logo from './LIVINGHOPEwhite.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
      dbResponse: ''
    };
  }

  callAPI() {
    fetch('http://localhost:5000/api/values')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  callDB() {
    fetch('http://localhost:5000/api/users')
      .then(res => res.text())
      .then(res => this.setState({ dbResponse: res }))
      .catch(err => err);
  }

  componenetDidMount() {
    this.callAPI();
    this.callDB();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the Living Hope Management System
          </h1>
        </header>
        <RTF />
        <MyUsers />
        <p className="systemstatus">{this.state.apiResponse}</p>
        <p className="systemStatus">{this.state.dbResponse}</p>
      </div>
    );
  }
}
export default App;
