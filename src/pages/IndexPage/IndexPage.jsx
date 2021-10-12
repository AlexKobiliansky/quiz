import React from 'react';
import {Typography} from '@material-ui/core';
import styles from './IndexPage.module.sass';
import {Link} from 'react-router-dom';
import {routes} from '../../config/routes';

const IndexPage = () => {
  return (
    <div className={'centering-wrap'}>
      <div>
        <Typography
          variant="h1"
          align="center"
          className={styles.pageTitle}
        >
          <b>Hi there!</b>
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className={styles.subTitle}
        >
          This is a Quiz application, based on ReactJS technologies, which will help you to improve your knowledge in different areas of IT-sphere
        </Typography>

        <Typography
          variant="h5"
          align="center"
          className={styles.body}
        >
          You can <Link to={routes.SIGNIN}>Login</Link> to have an ability to save results and track your progress
        </Typography>
        <Typography
          variant="h5"
          align="center"
          className={styles.body}
        >
          If you haven't an accaunt yet <Link to={routes.SIGNUP}>SIGN UP</Link> here or just link to <Link to={routes.CATEGORIES}>categories page</Link> for passing Quiz as anonymous
        </Typography>
      </div>
    </div>
  );
};

export default IndexPage;