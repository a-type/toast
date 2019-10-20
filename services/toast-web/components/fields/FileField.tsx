import React, { FC, useCallback } from 'react';
import {
  FileUploaderProps,
  FileUploader,
} from 'components/generic/FileUploader';
import { FormControl, FormLabel, FormHelperText } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { FormControlProps } from '@material-ui/core/FormControl';

export type FileFieldProps = Omit<FormControlProps, 'error'> & {
  label?: string;
  FileUploaderProps?: FileUploaderProps;
  error?: string;
};

export const FileField: FC<FileFieldProps> = ({
  label,
  FileUploaderProps,
  error,
  ...props
}) => {
  return (
    <FormControl {...props} error={!!error}>
      <FormLabel>{label}</FormLabel>
      <FileUploader {...FileUploaderProps} />
      {error && <FormHelperText color="error">{error}</FormHelperText>}
    </FormControl>
  );
};

export const FormikFileField: FC<FileFieldProps & { name: string }> = ({
  name,
  ...props
}) => {
  const [field, meta] = useField({ name });
  const form = useFormikContext<any>();

  const handleChange = useCallback(
    (files: File[]) => {
      form.setFieldValue(field.name, files);
      form.setFieldTouched(field.name, true);
    },
    [form.setFieldValue, field.name],
  );

  return (
    <FileField
      {...props}
      error={meta.error}
      FileUploaderProps={{
        ...props.FileUploaderProps,
        ...field,
        onChange: handleChange,
      }}
    />
  );
};
