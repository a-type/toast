import React, { ChangeEvent } from 'react';
import Input from './Input';
import Label from './Label';
import Wrapper from './Wrapper';
import Skeleton from './Skeleton';
import { Size } from 'theme';

interface CheckboxProps {
  className?: string;
  id?: string;
  value: string;
  checked: boolean;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange(ev: ChangeEvent<HTMLInputElement>): void;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  spaceBelow?: Size;
}

export default class Checkbox extends React.Component<CheckboxProps> {
  static defaultProps = {
    className: null,
    id: null,
    value: '',
    required: false,
    disabled: false,
    children: null,
    onChange: () => null,
    spaceBelow: 'md',
  };

  static Skeleton = Skeleton;

  naturalId = `checkbox${Math.floor(Math.random() * 10000000)}`;

  render() {
    const {
      id,
      className,
      disabled,
      checked,
      required,
      children,
      onChange,
      wrapperProps,
      spaceBelow,
    } = this.props;

    const finalId = id || this.naturalId;

    return (
      <Wrapper {...wrapperProps} spaceBelow={spaceBelow}>
        <Input
          id={finalId}
          className={className}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          required={required}
          onChange={onChange}
        />
        <Label htmlFor={finalId}>{children}</Label>
      </Wrapper>
    );
  }
}
