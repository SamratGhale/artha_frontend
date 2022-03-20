import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PATH_PAGE, ROOTS } from '../routes/paths';
import { getUser } from '../utils/sessionManager';

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children, authorizedUsers }) {
  const currentUser = getUser();
  if (!currentUser) {
    return <Redirect to={PATH_PAGE.auth.login} />;
  }
  const { role, is_approved } = currentUser;
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
  if(authorizedUsers.length===0){
    return <>{children}</>;
  }
  if (authorizedUsers && authorizedUsers.includes(role)) {
    return <>{children}</>;
  } else {
    return <Redirect to={ROOTS.app} />;
  }
}

export default AuthProtect;
