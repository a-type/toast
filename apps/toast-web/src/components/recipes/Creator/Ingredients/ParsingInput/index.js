import React from 'react';
import { Input, Field } from 'components/generic';

export default class IngredientParsingInput extends React.PureComponent {
  state = {
    freeformValue: '',
    active: !this.props.unitValue,
  };

  render() {
    const { active, freeformValue } = this.state;
    const { unit, unitValue, handleChange } = this.props;

    if (active) {
      return (
        <div>
          <Field required label="How much?">
            <Input
              required
              value={freeformValue}
              onChange={this.handleFreeformChange}
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
