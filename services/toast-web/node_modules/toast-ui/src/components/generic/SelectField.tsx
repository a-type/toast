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
} from '@material-ui/core';

export interface SelectFieldProps {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  label: string;
  name: string;
}

export const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  name,
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

  return (
    <FormControl variant="outlined">
      <InputLabel ref={labelRef} htmlFor={inputId.current}>
        {label}
      </InputLabel>
      <Select
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={name}
            id={inputId.current}
          />
        }
        {...props}
      />
    </FormControl>
  );
};

export default SelectField;
