import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from './Input';
import CheckboxLabel from './Label';

export default class Checkbox extends React.Component {
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
    /**
     * A component to render an input, by default hidden.
     */
    Input: PropTypes.func,
    /**
     * A component to render a label. By default this component renders the checkbox itself as a pseudoelement pair.
     */
    Label: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    id: null,
    value: false,
    required: false,
    disabled: false,
    children: null,
    onChange: () => null,
    Input: CheckboxInput,
    Label: CheckboxLabel,
  };

  naturalId = `checkbox${Math.floor(Math.random() * 10000000)}`;

  render() {
    const {
      className,
      disabled,
      checked,
      required,
      children,
      onChange,
      Input,
      Label,
    } = this.props;

    const id = this.props.id || this.naturalId;

    return (
      <div>
        <Input
          id={id}
          className={className}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          required={required}
          onChange={onChange}
        />
        <Label htmlFor={id} active={checked}>
          {children}
        </Label>
      </div>
    );
  }
}
