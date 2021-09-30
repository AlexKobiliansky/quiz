import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  name: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('Name must be a string!')
    .required('Enter your name, please!')
    .min(4, 'Name must be at least 4 characters length')
    .max(30, 'You name is too long. Maximum length - 30 characters'),
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
  confirmPassword: yup.string()
    .trim('There should be no spaces at the beginning and end of the line')
    .strict()
    .typeError('This value must be a string!')
    .required('Enter this field value')
    .oneOf([yup.ref('password')], 'Password mismatch'),
  file: yup.array().of(yup.object().shape({
    file: yup.mixed().test('fileSize', 'File is to large', (value) => {
      if (!value) return false;
      return value.size < 10485760
    }).required(),
    type: yup.string().oneOf(['image/gif', 'image/jpeg', 'image/png'], 'Wrong file format').required(),
    name: yup.string().required()
  }).nullable()),
});