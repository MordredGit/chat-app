import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { Transition } from "../../components/Transition";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "phosphor-react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import RHFAutoComplete from "../../components/hook-form/RHFAutoComplete";

const MEMBERS = ["AAAAA", "BBBBB", "CCCCC"];

const CreateGroupForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const CreateGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have atleast 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
  } = methods;

  const onSubmit = async (data: object) => {
    try {
      // Submit logic to backend
      console.log("DATA", data);
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
          name="title"
          helperText="Name of your group"
          label="Title"
        />
        <RHFAutoComplete
          name="members"
          label="Members"
          helperText="Please enter at least 2 members"
          multiple
          freeSolo
          ChipProps={{ size: "medium" }}
          options={MEMBERS.map((option) => option)}
        />
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogTitle variant="h4" sx={{ mb: 3 }}>
        Create New Group
      </DialogTitle>
      <DialogContent>
        <CreateGroupForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleClose}>
          Create New Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroup;
