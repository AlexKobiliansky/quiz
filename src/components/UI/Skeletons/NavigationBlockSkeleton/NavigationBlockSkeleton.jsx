import React from 'react';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fullWidth: {
    margin: '50px 0 20px',
  },
  small: {
    marginBottom: 10,
    marginLeft: 'auto'
  }
}));

const NavigationBlockSkeleton = () => {
  const classes = useStyles();
  return (
    <>
      <Skeleton variant="rect" width='100%' height={25} className={classes.fullWidth}/>
      <Skeleton variant="rect" width={85} height={25} className={classes.small}/>
      <Skeleton variant="rect" width={100} height={25} className={classes.small}/>
      <Skeleton variant="rect" width='100%' height={320} className={classes.fullWidth}/>
    </>
  );
};

export default NavigationBlockSkeleton;