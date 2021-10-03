import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserByIdAC} from '../../redux/actions/user';
import {currentUserSelector, userSelector} from '../../redux/selectors/userSelectors';
import {Grid, Paper, Typography} from '@material-ui/core';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const user = useSelector(userSelector);
  // const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    dispatch(fetchUserByIdAC(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        className="pageTitle"
        align="center"
      >
        Profile page: <b>{user?.name}</b>
      </Typography>


      <Grid container spacing={3}>
        <Grid item xs={4}>
          image label
        </Grid>
        <Grid item xs={8}>
          info inputs
        </Grid>
      </Grid>

    </div>
  );
};

export default ProfilePage;