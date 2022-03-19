import React from "react";
import PropTypes from 'prop-types';
import { getUser } from "../../utils/sessionManager";

AuthProtectNav.propTypes = {
    children: PropTypes.node
};

function AuthProtectNav({children, authorizedUsers}) {
   const currentUser = getUser();
   const {role} = currentUser; 

  if(authorizedUsers.length==0){
    return <>{children}</>;
  }
  if (authorizedUsers && authorizedUsers.includes(role)) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
export default AuthProtectNav;

