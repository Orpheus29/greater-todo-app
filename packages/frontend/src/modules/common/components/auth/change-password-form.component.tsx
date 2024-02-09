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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { IChangePassword, IUser } from '../../types/auth.types';
import { changePasswordSchema } from '../../utils/auth-form-validation.util';
import { APP_KEYS } from '../../consts';
import { useAuth } from '../../hooks/auth/auth.hook';
import { useChangePassword } from '../../hooks/auth/change-password.hook';

export const ChangePasswordForm = () => {
  const [error, setError] = useState<string>('');
  const resetPassword = useChangePassword(setError);
  const user = useAuth().data as IUser;
  const formik = useFormik<IChangePassword>({
    initialValues: {
      id: user.id,
      oldPassword: '',
      newPassword: ''
    },
    onSubmit: (values, actions) => {
      resetPassword.mutate(values);
      actions.setSubmitting(false);
    },
    validationSchema: changePasswordSchema
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
          Change Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.oldPassword ? formik.errors.oldPassword : null}
            error={formik.touched.oldPassword && !!formik.errors.oldPassword}
            margin="normal"
            type="password"
            label="Old Password"
            fullWidth
          />
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
            change password
          </Button>
          <LinkMUI component={Link} to={APP_KEYS.ROUTER_KEYS.HOME} variant="body2">
            Back to Home
          </LinkMUI>
        </Box>
      </Box>
    </Container>
  );
};
