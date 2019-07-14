import React, { Component } from 'react';
import AppBar from 'components/AppBar';
import HeaderBar from 'components/headerBar';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <AppBar />
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

export default ErrorPage;
