import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Forgot your password?
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter your email associated with your account and we will email
          you a link to reset your password.
        </Typography>
        <ResetPasswordForm />
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

export default ResetPassword;
