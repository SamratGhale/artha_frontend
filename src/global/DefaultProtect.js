import React from 'react';
import PropTypes from 'prop-types';

DefaultAuth.propTypes = {
  children: PropTypes.node
};

function DefaultAuth({ children }) {
  return <>{children}</>;
}

export default DefaultAuth;