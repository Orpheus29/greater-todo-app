import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { IUserRequest } from '../../types/auth.types';
import { useLogin } from '../../hooks/auth/login.hook';
import { userFormSchema } from '../../utils/auth-form-validation.util';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export default function SignIn() {
  const [error, setError] = useState<string>();
  const login = useLogin(setError);
  const formik = useFormik<IUserRequest>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      login.mutate(values);
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
          Sign in
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkMUI component={Link} to={ROUTER_KEYS.REQUEST_RESET} variant="body2">
                Forgot password?
              </LinkMUI>
            </Grid>
            <Grid item>
              <LinkMUI component={Link} to={ROUTER_KEYS.SIGN_UP} variant="body2">
                Dont have an account? Sign Up
              </LinkMUI>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
