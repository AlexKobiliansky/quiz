import React from 'react';

import {AppBar, Button, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {routes} from '../../config/routes';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to={routes.SIGNIN}>Login</Button>
        <Button color="inherit" component={Link} to={routes.SIGNUP}>Registration</Button>
        <Button color="inherit" component={Link} to={routes.CATEGORIES}>Start Quiz</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;