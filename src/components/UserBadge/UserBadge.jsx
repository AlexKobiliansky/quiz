import React, {useState} from 'react';
import {Avatar, Menu, MenuItem} from '@material-ui/core';
import styles from './UserBadge.module.sass';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.jpg';
import {Link, useHistory} from 'react-router-dom';
import {logoutAC} from '../../redux/actions/user';
import {routes} from '../../config/routes';
import {useDispatch} from 'react-redux';

const UserBadge = ({user}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    closeMenu();
    dispatch(logoutAC());
    history.push(routes.INDEX);
  }
  return (
    <>
      <div className={styles.badge} onClick={openMenu}>
        <Avatar alt="Remy Sharp" src={user?.img ? user.img : avatarPlaceholder} />

        <div className={styles.triangle} />
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
      >
        <MenuItem
          component={Link}
          to={`/profile/${user.id}`}
          onClick={closeMenu}
        >
          Edit profile
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/statistics/${user.id}`}
          onClick={closeMenu}
        >
          Statistics
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>

  );
};

export default UserBadge;