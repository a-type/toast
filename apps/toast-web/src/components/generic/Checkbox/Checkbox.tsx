import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Label from './Label';

interface CheckboxProps {
  className?: string;
  id?: string;
  checked: boolean;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange(ev: ChangeEvent<HTMLInputElement>): void;
}

export default class Checkbox extends React.Component<CheckboxProps> {
  static propTypes = {
    /**
     * Adds a class name to the input element.
     */
    className: PropTypes.string,
    /**
     * Adds an id to the input element.
     */
    id: PropTypes.string,
    /**
     * The value of the checkbox.
     */
    checked: PropTypes.bool,
    /**
     * Whether the checkbox is required for form submission.
     */
    required: PropTypes.bool,
    /**
     * Whether the user is prevented from interacting with the checkbox.
     */
    disabled: PropTypes.bool,
    /**
     * A description to display next to the checkbox.
     */
    children: PropTypes.node,
    /**
     * Callback for the onChange event of the input.
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    id: null,
    value: false,
    required: false,
    disabled: false,
    children: null,
    onChange: () => null,
  };

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
    } = this.props;

    const finalId = id || this.naturalId;

    return (
      <div>
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
      </div>
    );
  }
}
