import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import ButtonAppBar from 'components/AppBar';

const endpoint: string = 'status';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);
class About extends Component {
  async componentWillMount() {
    const data = await fetch(url);

    const jsonData = await data.json();

    if (jsonData === null) {
      this.setState({
        databaseStatus:
          'An error ocurred connecting with the database. Please contact an administrator.'
      });
    }
    this.setState({ databaseStatus: jsonData });
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
