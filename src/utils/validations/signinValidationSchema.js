import * as yup from 'yup';

export const signinValidationSchema = yup.object().shape({
  email: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('Name must be a string!')
    .required('Enter your your email, please!')
    .email('Incorrect email!'),
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
});