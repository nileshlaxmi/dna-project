import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RoutePrivate = ({
  component: Component,
  isAuthenticated,
  to,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={to} />
      )
    }
  />
);

RoutePrivate.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
  to: PropTypes.string,
};

RoutePrivate.defaultProps = {
  to: '/',
};

export default RoutePrivate;
