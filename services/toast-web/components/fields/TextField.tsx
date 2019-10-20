import React, { FC } from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';
import { useField } from 'formik';

export const TextField = MuiTextField;

export const FormikTextField: FC<MuiTextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField({
    name: props.name,
    value: props.value,
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  } as any);

  return (
    <MuiTextField
      {...props}
      label={label}
      {...field}
      error={!!meta.error}
      helperText={meta.error || props.helperText}
    />
  );
};
