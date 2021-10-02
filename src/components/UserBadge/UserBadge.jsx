import React, {useState} from 'react';
import {Avatar, Menu, MenuItem, MenuList} from '@material-ui/core';
import styles from './UserBadge.module.sass';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import {Link} from 'react-router-dom';

const UserBadge = ({user}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
      >
          <MenuItem>
            <Link to={'/profile/id'}>Profile</Link>
          </MenuItem>
          <MenuItem>
            <Link to={'/statistics/id'}>My account</Link>
          </MenuItem>
          <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
    </>

  );
};

export default UserBadge;