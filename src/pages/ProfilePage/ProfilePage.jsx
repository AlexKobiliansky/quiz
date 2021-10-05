import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserByIdAC, updateCurrentUserAC, updateUserAC} from '../../redux/actions/user';
import {currentUserSelector, userSelector} from '../../redux/selectors/userSelectors';
import {Grid, Typography} from '@material-ui/core';
import ImgLabel from '../../components/ImgLabel/ImgLabel';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const user = useSelector(userSelector);
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    dispatch(fetchUserByIdAC(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onEditImg = url => {
    const updObj = {img: url};
    dispatch(updateUserAC(id, updObj));

    if (id === Number(currentUser.id)) dispatch(updateCurrentUserAC(updObj));
  }

  const onDeleteImg = () => {
    const updObj = {img: null};

    dispatch(updateUserAC(id, updObj));

    if (id === Number(currentUser.id)) dispatch(updateCurrentUserAC(updObj));
  }

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

      <Grid container spacing={6}>
        <Grid item xs={3}>
          <ImgLabel
            img={user?.img}
            onEdit={onEditImg}
            onDelete={onDeleteImg}
          />
        </Grid>
        <Grid item xs={9}>
          info inputs
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;