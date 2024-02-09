import * as yup from 'yup';

export const userFormSchema = yup.object({
  email: yup.string().email().required('email is required'),
  password: yup.string().min(5).max(50).required('password is required')
});

export const resetPasswordSchema = yup.object({
  newPassword: yup.string().min(5).max(50).required('required')
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().min(5).max(50).required('required'),
  newPassword: yup.string().min(5).max(50).required('required')
});

export const requestResetSchema = yup.object({
  email: yup.string().email().required('email is required')
});
