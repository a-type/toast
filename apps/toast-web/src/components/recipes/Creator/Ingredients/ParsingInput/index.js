import React from 'react';
import { Input, Field, Link } from 'components/generic';
import parser from './parseIngredientUnits';
import { toReadableFraction } from 'readable-fractions';
import pluralize from 'pluralize';

export default class IngredientParsingInput extends React.PureComponent {
  state = {
    freeformValue: '',
    active: !this.props.unitValue,
    detectedUnit: null,
    detectedUnitValue: null,
    invalid: false,
  };

  handleFreeformChange = ev => {
    const freeform = ev.target.value;

    const { unit, number, leftovers } = parser(freeform);

    this.setState({
      detectedUnit: unit,
      detectedValue: number,
      freeformValue: freeform,
      invalid: false,
    });

    this.props.setFieldValue('unit', unit);
    this.props.setFieldValue('unitValue', number);
  };

  disable = () => this.setState({ active: false });

  helpText = () => {
    const { detectedUnit, detectedValue, invalid } = this.state;

    if (invalid) {
      return (
        <span>
          We couldn&apos;t figure out what you meant.{' '}
          <Link onClick={this.disable}>Enter it manually?</Link>
        </span>
      );
    }

    if (!detectedValue) {
      return "Type a quantity, like '1/2 tbsp'";
    }

    return `We read this as '${toReadableFraction(detectedValue, true)}${
      detectedUnit ? ' ' + pluralize(detectedUnit, detectedValue) : ''
    }'`;
  };

  handleBlur = () => {
    if (this.state.detectedValue) {
      this.setState({ active: false });
    } else if (this.state.freeformValue.length) {
      this.setState({
        invalid: true,
      });
    }
  };

  render() {
    const { active, freeformValue } = this.state;
    const { unit, unitValue, handleChange } = this.props;

    if (active) {
      return (
        <div>
          <Field required label="How much?" helpText={this.helpText()}>
            <Input
              required
              value={freeformValue}
              onChange={this.handleFreeformChange}
              onBlur={this.handleBlur}
            />
          </Field>
        </div>
      );
    }

    return (
      <div>
        <Field label="Quantity" required>
          <Input
            name="unitValue"
            required
            onChange={handleChange}
            value={unitValue}
          />
        </Field>
        <Field label="Units" required>
          <Input name="unit" required onChange={handleChange} value={unit} />
        </Field>
      </div>
    );
  }
}
