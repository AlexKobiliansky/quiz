import React, {useState} from 'react';
import {checkUserPasswordAC, updateUserAC} from '../../../redux/actions/user';
import {Button, Snackbar, Typography} from '@material-ui/core';
import CustomPasswordField from '../CustomPasswordField/CustomPasswordField';
import {Formik} from 'formik';
import {changePasswordValidationSchema} from '../../../utils/validations/changePasswordValidationSchema';
import {useDispatch, useSelector} from 'react-redux';
import {currentUserSelector} from '../../../redux/selectors/userSelectors';
import {Alert} from '@material-ui/lab';
import bcrypt from 'bcryptjs';

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({severity: null, message: null});

  let submitForm = async (values) => {
    setLoading(true);
    const user = await checkUserPasswordAC(currentUser?.email, values?.password);

    if (user.status === 'error') {
      handleOpenAlert('error', user.message);
    } else {
      const result = await dispatch(updateUserAC(currentUser.id, {password: bcrypt.hashSync(values.newPassword, 8)}));
      if (result.status === 'error') {
        handleOpenAlert('error', result.message);
      } else {
        await handleOpenAlert('success', result.message);
      }
    }
    setLoading(false);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertInfo({severity, message});
    setOpenAlert(true);
  }

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          variant="filled">
          {alertInfo.message}
        </Alert>
      </Snackbar>

      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          submitForm(values)
        }}
        validationSchema={changePasswordValidationSchema}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
          <form className="form popup-form">
            <Typography variant="h4" className="formTitle">Change password</Typography>
            <div className="form-labels-wrap">
              <CustomPasswordField
                id="password"
                name="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={touched.password && errors.password}
                error={touched.password && errors.password}
              />

              <CustomPasswordField
                id="newPassword"
                name="newPassword"
                label="New password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                error={touched.newPassword && errors.newPassword}
              />

              <CustomPasswordField
                id="confirmNewPassword"
                name="confirmNewPassword"
                label="Confirm new password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmNewPassword}
                helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                error={touched.confirmNewPassword && errors.confirmNewPassword}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              className="button"
              size="large"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Update'}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;