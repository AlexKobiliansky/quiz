import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserByIdAC, updateCurrentUserAC, updateUserAC} from '../../redux/actions/user';
import {currentUserSelector, isLoadingUser, userSelector} from '../../redux/selectors/userSelectors';
import {Grid, Typography} from '@material-ui/core';
import ImgLabel from '../../components/ImgLabel/ImgLabel';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import {Skeleton} from '@material-ui/lab';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const user = useSelector(userSelector);
  const currentUser = useSelector(currentUserSelector);
  const loadingUser = useSelector(isLoadingUser);

  useEffect(() => {
    dispatch(fetchUserByIdAC(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onEditImg = url => {
    const updObj = {img: url};
    dispatch(updateUserAC(id, updObj));
    if (id === Number(currentUser.id)) {
      dispatch(updateCurrentUserAC(updObj));
    }
  }

  const onDeleteImg = () => {
    const updObj = {img: null};
    dispatch(updateUserAC(id, updObj));
    if (id === Number(currentUser.id)) {
      dispatch(updateCurrentUserAC(updObj));
    }
  }

  const onEditInput = (inputEntity, value) => {
    if(!value) {
      return alert('Значение не может быть пустым!')
    }

    dispatch(updateUserAC(id, {[inputEntity]: value}));
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
          {
            loadingUser
              ? <Skeleton variant="rect" width='100%' height={310} />
              : (
                <ImgLabel
                  img={user?.img}
                  onEdit={onEditImg}
                  onDelete={onDeleteImg}
                />
              )
          }

        </Grid>
        <Grid item xs={9}>
          <CustomLabel
            title="Name"
            value={user?.name}
            entity="name"
            onEdit={onEditInput}
            loading={loadingUser}
          />

          <CustomLabel
            title="Email"
            value={user?.email}
            entity="email"
            onEdit={onEditInput}
            loading={loadingUser}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;