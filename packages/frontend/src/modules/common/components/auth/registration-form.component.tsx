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
import { IUserRequest } from '../../types/auth.types';
import { userFormSchema } from '../../utils/auth-form-validation.util';
import { useRegistration } from '../../hooks/auth/register.hook';
import { APP_KEYS } from '../../consts';

export const RegistrationForm = () => {
  const [error, setError] = useState('');
  const registration = useRegistration(setError);
  const formik = useFormik<IUserRequest>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      registration.mutate(values);
      actions.setSubmitting(false);
    },
    validationSchema: userFormSchema
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : null}
            error={formik.touched.email && !!formik.errors.email}
            margin="normal"
            autoComplete="email"
            label="Email"
            fullWidth
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password ? formik.errors.password : null}
            error={formik.touched.password && !!formik.errors.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && <Alert severity="error">{error};</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
          <LinkMUI component={Link} to={APP_KEYS.ROUTER_KEYS.SIGN_IN} variant="body2">
            Have an account? Sign In
          </LinkMUI>
        </Box>
      </Box>
    </Container>
  );
};
