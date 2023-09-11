import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset your password?
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter your new password.
        </Typography>
        <NewPasswordForm />
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
