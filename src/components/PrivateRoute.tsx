import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, roles, ...rest})
{
    return (
        <Route {...rest} render={props => {
            //This is failing to set and sending users back to the home page.
            const user = localStorage.getItem('currentUser');
            if(!user) {
                console.error("Redirecting to Login");
                return <Redirect to={{pathname: '/Login', state: { from: props.location } }} />
            }

            /*if (roles && roles.indexOf(user.role) === -1) {
                return <Redirect to={{ pathname: '/Home'}} />
            }*/

            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute }