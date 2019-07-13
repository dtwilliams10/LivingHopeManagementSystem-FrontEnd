import React, { Component } from 'react';
import ButtonAppBar from '../components/AppBar';
import HeaderBar from '../components/headerBar';

class Error extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <ButtonAppBar />
        <div>
          <p>The page you have requested is not found.</p>
          <p>
            Please click one of the links above, or click{' '}
            <a href="/Home">here</a> to go back to the home page.
          </p>
        </div>
      </div>
    );
  }
}

export default Error;
