import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';
import { getUser } from '../utils/sessionManager';

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children, authorizedUsers }) {
  const currentUser = getUser();
  if (!currentUser) {
    return <Redirect to={PATH_PAGE.auth.login} />;
  }
  const { roles, is_approved } = currentUser;
  if (!is_approved) {
    return <Redirect to={PATH_PAGE.auth.waitForApprove} />;
  }
  const { isLoading } = { isLoading: false };
  if (isLoading) {
    return(
        <div>
            Loading..
        </div>
    )
  }
  if (authorizedUsers && roles.some((role) => authorizedUsers.includes(role))) {
    return <>{children}</>;
  } else {
    return <Redirect to={PATH_APP.root} />;
  }
}

export default AuthProtect;
