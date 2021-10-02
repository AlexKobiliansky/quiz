import React, {useState} from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

function AdminRoute({path, component: Component}) {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  return (
    <Route
      path={path}
      render={props => (
        userData && (userData.role === 'admin' || userData.role === 'superadmin') ?
          <Component {...props} /> :
          <Redirect to='/' />
      )}
    />
  );
}

AdminRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default AdminRoute;