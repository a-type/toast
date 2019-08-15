import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FilledInput,
} from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';

export interface SelectFieldProps extends SelectProps {
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  label?: string;
  name: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
}

export const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  name,
  fullWidth,
  variant = 'filled',
  ...props
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputId = useRef(id || `select-${Math.random()}`);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, []);

  const Component = variant === 'filled' ? FilledInput : OutlinedInput;

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      <InputLabel variant={variant} ref={labelRef} htmlFor={inputId.current}>
        {label}
      </InputLabel>
      <Select
        input={
          <Component labelWidth={labelWidth} name={name} id={inputId.current} />
        }
        {...props}
      />
    </FormControl>
  );
};

export default SelectField;
