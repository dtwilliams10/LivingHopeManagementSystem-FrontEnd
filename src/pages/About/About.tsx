import React, { Component } from 'react';
import HeaderBar from 'components/headerBar';
import ButtonAppBar from 'components/AppBar';

import axios from 'axios';
import { string } from 'prop-types';

const endpoint: string = 'status';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

class About extends Component {
  state = {
    databaseStatus: string
  };

  componentDidMount() {
    var _self = this;
    axios
      .get(url)
      .then(function(response) {
        console.log(response.data);
        _self.setState({
          databaseStatus: response.data
        });
      })
      .catch(function(error) {
        if (error.request) {
          console.log('Error', error.message);
          _self.setState({
            databaseStatus:
              'An error ocurred connecting witht he API. Please contact an administrator.'
          });
        }
      });
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <ButtonAppBar />
        <p>{JSON.stringify(this.state.databaseStatus)}</p>
      </div>
    );
  }
}

export default About;
