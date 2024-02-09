import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { IResetPassword } from '../../types/auth.types';
import { resetPasswordSchema } from '../../utils/auth-form-validation.util';
import { APP_KEYS } from '../../consts';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { useResetPassword } from '../../hooks/auth/reset-password.hook';

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string>('');
  const resetPassword = useResetPassword(setError);
  const { id } = useParams();
  if (!id) return <Navigate to={ROUTER_KEYS.SIGN_IN} />;
  const formik = useFormik<IResetPassword>({
    initialValues: {
      id,
      newPassword: ''
    },
    onSubmit: (values, actions) => {
      resetPassword.mutate(values);
      actions.setSubmitting(false);
    },
    validationSchema: resetPasswordSchema
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.newPassword ? formik.errors.newPassword : null}
            error={formik.touched.newPassword && !!formik.errors.newPassword}
            label="New Password"
            type="password"
            id="password"
          />
          {error && <Alert severity="error">{error};</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            reset password
          </Button>
          <LinkMUI component={Link} to={APP_KEYS.ROUTER_KEYS.SIGN_IN} variant="body2">
            Back to Sign In
          </LinkMUI>
        </Box>
      </Box>
    </Container>
  );
};
