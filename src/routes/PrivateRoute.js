import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getUser } from '../utils/sessionManager';
import { PATH_PAGE, ROOTS } from './paths';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = getUser();
      return currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: PATH_PAGE.auth.login,
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;