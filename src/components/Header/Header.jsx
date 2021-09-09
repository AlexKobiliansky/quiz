import React from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/registration">Registration</Button>
        <Button color="inherit" component={Link} to="/categories">Start Quiz</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;