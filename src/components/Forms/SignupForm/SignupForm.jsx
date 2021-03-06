import React, {useState} from 'react';
import {Button, Snackbar, TextField, Typography} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import CustomPasswordField from '../CustomPasswordField/CustomPasswordField';
import CustomFileField from '../CustomFileField/CustomFileField';
import {signupValidationSchema} from '../../../utils/validations/signupValidationSchema'
import {routes} from '../../../config/routes';
import {loginAC, registerAC} from '../../../redux/actions/user';
import {Alert} from '@material-ui/lab';
import {useAlert} from '../../../hooks/useAlert';


const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {openAlert, alertInfo, handleOpenAlert, handleCloseAlert} = useAlert();

  let submitForm = async (user) => {
    setLoading(true);
    const registerSuccess = await registerAC(user);

    if(registerSuccess) {
      if (registerSuccess.status === 'error') {
        handleOpenAlert('error', registerSuccess.message);
      } else {
        const candidate = await dispatch(loginAC(user.email, user.password));
        candidate && history.push(routes.INDEX);
      }
    }
    setLoading(false)
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
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          file: undefined
        }}
        validateOnBlur
        onSubmit={(values) => {
          submitForm(values)
        }}
        validationSchema={signupValidationSchema}
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
            <Typography variant="h2" className="formTitle">Signup</Typography>
            <div className="form-labels-wrap">
              <TextField
                id="name"
                name="name"
                type="text"
                label="Your name"
                className="textField"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                helperText={touched.name && errors.name}
                error={!!(touched.name && errors.name)}
                fullWidth
              />

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

              <CustomPasswordField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
              />

              <CustomFileField
                name="file"
                values={values.file}
                errors={errors.file}
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
              {loading ? 'Loading...' : 'Signup'}
            </Button>
            <small>Already have an account? login <Link to={routes.SIGNIN}>here</Link></small>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;