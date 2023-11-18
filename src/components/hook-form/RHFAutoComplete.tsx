import React, { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Autocomplete, InputProps, TextField } from '@mui/material';

const RHFAutoComplete = ({
  name,
  helperText,
  label,
  type,
  InputProps,
  options,
  ...other
}: {
  name: string;
  helperText: ReactNode;
  label?: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  options: readonly any[];
  InputProps?: Partial<InputProps>;
} & Omit<React.ComponentProps<typeof Autocomplete>, "renderInput">) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field } }) => {
        return (
          <Autocomplete
            {...field}
            fullWidth
            options={options}
            onChange={(event, newValue) =>
              setValue(name, newValue, { shouldValidate: true })
            }
            renderInput={(params) => (
              <TextField
                label={label}
                error={!!errors[name]}
                helperText={
                  errors[name] ? (errors[name]?.message as string) : helperText
                }
                {...params}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

export default RHFAutoComplete;
