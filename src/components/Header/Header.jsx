import React from 'react';

import {AppBar, Button, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {routes} from '../../config/routes';
import {useSelector} from 'react-redux';
import UserBadge from '../UserBadge/UserBadge';
import {currentUserSelector, isAuthSelector} from '../../redux/selectors/userSelectors';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '0 15px 0 7px'
  },
  toolbar: {
    paddingLeft: 0
  }
})

const Header = () => {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);
  const isAuth = useSelector(isAuthSelector);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {!isAuth && <Button color="inherit" component={Link} to={routes.SIGNIN}>Login</Button>}
        {!isAuth && <Button color="inherit" component={Link} to={routes.SIGNUP}>Registration</Button>}
        <Button color="inherit" component={Link} to={routes.CATEGORIES}>Start Quiz</Button>
      </Toolbar>

      {currentUser && <UserBadge user={currentUser}/>}
    </AppBar>
  );
};

export default Header;