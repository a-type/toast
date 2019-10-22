import React, { FC } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import { useField } from 'formik';
import Slider, { SliderProps } from '@material-ui/core/Slider';
import { Box, FormLabel, FormHelperText } from '@material-ui/core';

export type SliderFieldProps = Omit<FormControlProps, 'error'> & {
  label: string;
  SliderProps: SliderProps;
  error?: string;
};

export const SliderField: FC<SliderFieldProps> = ({
  label,
  SliderProps,
  error,
  ...props
}) => {
  return (
    <FormControl {...props} error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box p={1} pl={2} pr={2} width="100%">
        <Slider {...SliderProps} />
      </Box>
      {error && <FormHelperText color="error">{error}</FormHelperText>}
    </FormControl>
  );
};

export const FormikSliderField: FC<SliderFieldProps> = props => {
  const [field, meta] = useField(props.SliderProps as any);

  return (
    <SliderField
      {...props}
      {...meta}
      SliderProps={{ ...props.SliderProps, ...field }}
    />
  );
};
