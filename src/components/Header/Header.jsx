import React, {useState} from 'react';

import {AppBar, Button, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../config/routes';
import {useDispatch, useSelector} from 'react-redux';
import UserBadge from '../UserBadge/UserBadge';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const {currentUser, isAuth} = useSelector(({user}) => user);
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {!userData && <Button color="inherit" component={Link} to={routes.SIGNIN}>Login</Button>}
        {!userData && <Button color="inherit" component={Link} to={routes.SIGNUP}>Registration</Button>}
        <Button color="inherit" component={Link} to={routes.CATEGORIES}>Start Quiz</Button>
      </Toolbar>

      <UserBadge user={currentUser}/>
    </AppBar>
  );
};

export default Header;