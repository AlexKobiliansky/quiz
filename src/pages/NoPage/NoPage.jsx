import React from 'react';
import {Typography} from '@material-ui/core';
import styles from './NoPage.module.sass';
import {routes} from '../../config/routes';
import {Link} from 'react-router-dom';

const NoPage = () => {
  return (
    <div className={'centering-wrap'}>
      <div>
        <Typography
          variant="h1"
          align="center"
          className={styles.pageTitle}
        >
          <b>404</b>
        </Typography>
        <Typography
          variant="h2"
          align="center"
        >
          Page not found!
        </Typography>

        <Typography
          variant="body2"
          align="center"
          className={styles.body}
        >
          Please try again later or link to <Link to={routes.INDEX}>Main page</Link>
        </Typography>
      </div>
    </div>
  );
};

export default NoPage;