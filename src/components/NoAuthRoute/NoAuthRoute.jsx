import React, {useState} from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

function NoAuthRoute({path, component: Component}) {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  return (
    <Route
      path={path}
      render={props => (
        !userData ?
          <Component {...props} /> :
          <Redirect to='/' />
      )}
    />
  );
}

NoAuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default NoAuthRoute;