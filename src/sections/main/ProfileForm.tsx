import React, { useCallback } from "react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    about: Yup.string(),
    avatarUrl: Yup.string().required("Avatar is required").nullable(),
  });

  const defaultValues = {
    name: "",
    about: "",
    avatarUrl: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const value = watch();
  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, {
          shouldValidate: true,
        });
      }
    },
    [setValue]
  );

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
      <Stack spacing={4}>
        {!!errors.root?.afterSubmit && (
          <Alert severity="error">{errors.root.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="name"
          helperText="This name is visible to your contacts"
          label="Name"
        />
        <RHFTextField
          name="about"
          helperText=""
          label="About"
          multiline
          rows={3}
        />
        <Stack alignItems={"end"}>
          <Button sx={{ width: "50%" }} size="large" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
