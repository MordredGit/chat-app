import React from "react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";

const ResetPasswordForm = () => {
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    try {
      // Submit logic to backend
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error while submitting: ", err);
        reset();
        setError("root.afterSubmit", {
          ...err,
          message: err.message,
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.root?.afterSubmit && (
          <Alert severity="error">{errors.root.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="email"
          helperText="Email Address"
          label="Email Address"
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.secondary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Send Request
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
