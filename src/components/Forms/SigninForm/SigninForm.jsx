import React, {useState} from 'react';
import {Button, Snackbar, TextField, Typography} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import CustomPasswordField from '../CustomPasswordField/CustomPasswordField';
import {signinValidationSchema} from '../../../utils/validations/signinValidationSchema';
import {routes} from '../../../config/routes';
import {loginAC} from '../../../redux/actions/user';
import {Alert} from '@material-ui/lab';

const SigninForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({severity: null, message: null});

  let submitForm = async (values) => {
    setLoading(true);
    const user = await dispatch(loginAC(values.email, values.password));

    if (user.status === 'error') {
      handleOpenAlert('error', user.message);
    } else {
      user && history.push(routes.INDEX);
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
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          submitForm(values)
        }}
        validationSchema={signinValidationSchema}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
          <form className="form">
            <Typography variant="h2" className="formTitle">Signin</Typography>
            <div className="form-labels-wrap">
              <TextField
                id="email"
                name="email"
                type="text"
                label="Email"
                className="textField"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email && errors.email}
                error={!!(touched.email && errors.email)}
                fullWidth
              />

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
              {loading ? 'Loading...' : 'Signin'}
            </Button>
            <small>Don't have an account? register <Link to={routes.SIGNUP}>here</Link></small>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SigninForm;