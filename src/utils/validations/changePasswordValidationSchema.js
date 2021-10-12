import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object().shape({
  password: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('Password must be a string!')
    .required('Enter password')
    .min(8, 'Password must be at least 8 characters long'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Password must contain at least one uppercase character, regular character, number and special character"
  // ),
  newPassword: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('Password must be a string!')
    .required('Enter password')
    .min(8, 'Password must be at least 8 characters long'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Password must contain at least one uppercase character, regular character, number and special character"
  // ),
  confirmNewPassword: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('This value must be a string!')
    .required('Enter this field value')
    .oneOf([yup.ref('newPassword')], 'Password mismatch'),
});