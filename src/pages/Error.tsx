import React from 'react';

function ErrorPage()  {
    return (
        <div className="errorForm">
          <br/>
          <h3>We're sorry, you have encountered an error!</h3>
          <p>The page you have requested was not found.</p>
          <p>
            Please click{' '} <a href="/Home">here</a> to go back to the home page.
          </p>
        </div>
    );
}

export default ErrorPage;
