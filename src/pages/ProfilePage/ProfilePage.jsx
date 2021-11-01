import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserByIdAC, updateCurrentUserAC, updateUserAC} from '../../redux/actions/user';
import {currentUserSelector, isLoadingUser, userSelector} from '../../redux/selectors/userSelectors';
import {
  Button, Dialog, DialogActions, DialogContent, FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import ImgLabel from '../../components/ImgLabel/ImgLabel';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import {Skeleton} from '@material-ui/lab';
import {routes} from '../../config/routes';
import ChangePasswordForm from '../../components/Forms/ChangePasswordForm/ChangePasswordForm';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  statisticsLink: {
    display: 'block',
    marginTop: 30,
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const user = useSelector(userSelector);
  const currentUser = useSelector(currentUserSelector);
  const loadingUser = useSelector(isLoadingUser);
  const [role, setRole] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchUserByIdAC(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setRole(user?.role)
  }, [user])

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

    if (id === Number(currentUser.id)) {
      dispatch(updateCurrentUserAC({[inputEntity]: value}));
    }
  }

  const onEditSelect = e => {
    setRole(e.target.value);
    dispatch(updateUserAC(id, {[e.target.name]: e.target.value}));

    if (id === Number(currentUser.id)) {
      dispatch(updateCurrentUserAC({[e.target.name]: e.target.value}));
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
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
              : <>
                  <ImgLabel
                    img={user?.imageUrl}
                    onEdit={onEditImg}
                    onDelete={onDeleteImg}
                    editable={id === currentUser?.id}
                  />
                {((currentUser?.role === 'superadmin') || (currentUser?.role === 'admin')) && <>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="role">Select users role</InputLabel>
                    <Select
                      id="role"
                      name="role"
                      value={role}
                      onChange={onEditSelect}
                    >
                      {currentUser?.role === 'superadmin' && <MenuItem value={'superadmin'}>Superadmin</MenuItem>}
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'customer'}>Customer</MenuItem>
                    </Select>
                  </FormControl>

                  <Link
                    to={`${routes.STATISTICS}${user?.id}`}
                    className={classes.statisticsLink}
                  >
                    Show {user?.name}'s statistics
                  </Link>
                </>
                }
              </>
          }

        </Grid>
        <Grid item xs={9}>
          <CustomLabel
            title="Name"
            value={user?.name}
            entity="name"
            onEdit={onEditInput}
            loading={loadingUser}
            editable={id===currentUser?.id}
          />

          <CustomLabel
            title="Email"
            value={user?.email}
            entity="email"
            onEdit={onEditInput}
            loading={loadingUser}
            editable={id===currentUser?.id}
          />

          {id===currentUser?.id && <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleOpenDialog}
          >
            Change Password
          </Button>}
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          <ChangePasswordForm setOpenDialog={setOpenDialog}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close popup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;