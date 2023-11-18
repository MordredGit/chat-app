import { CaretLeft } from 'phosphor-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

import VerifyForm from '../../sections/auth/VerifyForm';

const Verify = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Verify your OTP
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Thanks for signing up! Just one more step. Please verify your otp
        </Typography>
        <VerifyForm />
        <Link
          component={RouterLink}
          to={"/auth/login"}
          color={"inherit"}
          variant="subtitle2"
        >
          <Stack direction={"row"} alignItems={"center"}>
            <CaretLeft />
            Return to sign in
          </Stack>
        </Link>
      </Stack>
    </>
  );
};

export default Verify;
