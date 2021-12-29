import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RoutePublic = ({
  component: Component,
  isAuthenticated,
  to,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Redirect to={to} /> : <Component {...props} />
    }
  />
);

RoutePublic.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool.isRequired,
  to: PropTypes.string,
};

RoutePublic.defaultProps = {
  to: sessionStorage.getItem('pathname')?.includes(`bulk-upload`)
    ? sessionStorage.getItem('pathname')
    : '/unique-login',
};

export default RoutePublic;
