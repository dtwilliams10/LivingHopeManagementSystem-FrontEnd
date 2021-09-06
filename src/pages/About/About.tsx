import React, { Component } from 'react';
import ButtonAppBar from 'components/AppBar';

import axios from 'axios';
import { string } from 'prop-types';

const endpoint: string = 'status';
const url: string = process.env.REACT_APP_API + endpoint;

class About extends Component {
  state = {
    databaseStatus: string
  };

  componentDidMount() {
    var _self = this;
    axios
      .get(url)
      .then(function(response) {
        _self.setState({
          databaseStatus: response.data
        });
      })
      // Add a redirect to the Error page and display this message.
      .catch(function(error) {
        if (error.request) {
          console.log('Error', error.message);
          _self.setState({
            databaseStatus:
              'An error ocurred connecting with the API. Please contact an administrator.'
          });
        }
      });
  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <p>{JSON.stringify(this.state.databaseStatus)}</p>
      </div>
    );
  }
}

export default About;
