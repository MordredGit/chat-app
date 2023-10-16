import { InputProps, TextField } from "@mui/material";
import React, { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";

const RHFTextField = ({
  name,
  helperText,
  label,
  type,
  InputProps,
  ...other
}: {
  name: string;
  helperText: ReactNode;
  label?: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  InputProps?: Partial<InputProps>;
} & React.ComponentProps<typeof TextField>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => {
        return (
          <TextField
            {...field}
            inputRef={ref}
            error={!!errors[name]}
            fullWidth
            helperText={
              errors[name] ? (errors[name]?.message as string) : helperText
            }
            label={label}
            type={type}
            InputProps={InputProps}
            {...other}
          />
        );
      }}
    />
  );
};

export default RHFTextField;
