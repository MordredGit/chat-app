import { Eye, EyeClosed } from 'phosphor-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';

import { RHFTextField } from '../../components/hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import { RegisterUser } from '../../redux/slices/auth';
import { useDispatch } from '../../redux/store';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: Optional<typeof defaultValues, "lastName">) => {
    try {
      // Submit logic to backend
      dispatch(RegisterUser(data));
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField
            name="firstName"
            helperText="First Name"
            label="First Name"
          />
          <RHFTextField
            name="lastName"
            helperText="Last Name"
            label="Last Name"
          />
        </Stack>
        <RHFTextField
          name="email"
          helperText="Email Address"
          label="Email Address"
        />
        <RHFTextField
          name="password"
          helperText="Password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setshowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeClosed />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Button
        type="submit"
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
        Create Account
      </Button>
    </FormProvider>
  );
};

export default RegisterForm;
