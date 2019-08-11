import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import ButtonAppBar from 'components/AppBar';

const endpoint: string = 'status';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);
class About extends Component {
  componentWillMount() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ databaseStatus: response });
      });
  }

  render() {
    const dbStatus = JSON.stringify(this.state);
    return (
      <div>
        <HeaderBar />
        <ButtonAppBar />
        <div>{dbStatus}</div>
      </div>
    );
  }
}

export default About;
