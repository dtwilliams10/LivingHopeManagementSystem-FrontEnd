import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import {accountService} from '../services/account.service'

function PrivateRoute({ component: Component, roles, ...rest})
{
    return (
        <Route {...rest} render={props => {
            const user = accountService.userValue;
            if(!user) {
                return <Redirect to={{pathname: '/Login', state: { from: props.location } }} />
            }

            if (roles && roles.indexOf(user.role) === -1) {
                return <Redirect to={{ pathname: '/Home'}} />
            }

            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute }