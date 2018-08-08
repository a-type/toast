import React from 'react';
import { Input, Field, Link } from 'components/generic';
import parse from './parseIngredient';
import { toReadableFraction } from 'readable-fractions';
import pluralize from 'pluralize';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default class IngredientParsingInput extends React.PureComponent {
  state = {
    value: initialValue,
    active: !this.props.unitValue,
    detectedUnit: null,
    detectedUnitValue: null,
    invalid: false,
  };

  handleChange = ({ value }) => {
    const parsed = parse(Plain.serialize(value));
    console.info(parsed);

    this.setState({
      value,
    });
  };

  disable = () => this.setState({ active: false });

  render() {
    const { active, value } = this.state;
    const { unit, unitValue, handleChange } = this.props;

    return (
      <div>
        <Field
          required
          label="Describe the ingredient"
          helpText="Like '1/3 tablespoon nutmeg'"
        >
          <Editor required value={value} onChange={this.handleChange} />
        </Field>
      </div>
    );
  }
}
