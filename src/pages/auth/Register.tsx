import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import RegisterForm from "../../sections/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started with Tawk</Typography>
        <Stack spacing={0.5} direction={"row"}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
        <RegisterForm />
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            typography: "caption",
            mt: 3,
            textAlign: "center",
          }}
        >
          {"By signing up you agree to "}
          <Link
            color={"text.primary"}
            underline="always"
            sx={{ cursor: "pointer" }}
          >
            Terms of Service
          </Link>
          {" and "}
          <Link
            color={"text.primary"}
            underline="always"
            sx={{ cursor: "pointer" }}
          >
            Privacy policy
          </Link>
        </Typography>
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Register;
