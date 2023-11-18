import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Welcome to Tawk</Typography>
        <Stack spacing={0.5} direction={"row"}>
          <Typography variant="body2">New User?</Typography>
          <Link
            component={RouterLink}
            to={"/auth/register"}
            variant="subtitle2"
          >
            Create an account
          </Link>
        </Stack>
        <LoginForm />
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
