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
import { IRequestReset } from '../../types/auth.types';
import { requestResetSchema } from '../../utils/auth-form-validation.util';
import { APP_KEYS } from '../../consts';
import { useRequestReset } from '../../hooks/auth/request-reset.hook';

export const RequestResetForm = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const requestReset = useRequestReset(setMessage, setError);
  const formik = useFormik<IRequestReset>({
    initialValues: {
      email: ''
    },
    onSubmit: (values, actions) => {
      requestReset.mutate(values);
      actions.setSubmitting(false);
    },
    validationSchema: requestResetSchema
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
          {error && <Alert severity="error">{error};</Alert>}
          {message && <Alert severity="success">{message};</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            submit
          </Button>
          <LinkMUI component={Link} to={APP_KEYS.ROUTER_KEYS.SIGN_IN} variant="body2">
            Back to Sign In
          </LinkMUI>
        </Box>
      </Box>
    </Container>
  );
};
