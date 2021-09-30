import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import CustomPasswordField from '../CustomPasswordField/CustomPasswordField';
import {Link} from 'react-router-dom';
import {Formik} from 'formik';
import CustomFileField from '../CustomFileField/CustomFileField';
import {signupValidationSchema} from '../../../utils/validations/signupValidationSchema'

const SignupForm = () => {
  let submitForm = async (values) => {
    console.log(values)
  }

  return (
    <>
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
            isValid,
            handleSubmit,
            dirty,
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
            >
              Signup
            </Button>
            <small>Already have an accaunt? login <Link to="/signin">here</Link></small>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;