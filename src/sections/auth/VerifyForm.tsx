import React, { useState } from "react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeClosed } from "phosphor-react";
import { useDispatch, useSelector } from "../../redux/store";
import { ResetPassword, VerifyEmail } from "../../redux/slices/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import RHFCodes from "../../components/hook-form/RHFCodes";

const VerifyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const email = useSelector((state) => state.auth.email);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      // console.log(data);
      const otp = Object.keys(data).reduce((otp, code) => otp + code, "");
      // Submit logic to backend
      dispatch(
        VerifyEmail({
          otp,
          email,
        })
      )
        .then(() => navigate("/auth/login"))
        .catch((err) => console.log(err));
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
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />
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
          Change Password
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
