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
    textState: initialValue,
    active: !this.props.unitValue,
    unit: null,
    unitTextMatch: null,
    value: null,
    valueTextMatch: null,
    ingredientTextMatch: null,
  };

  handleKeyDown = (event, change, editor) => {
    if (event.key === 'space') {
      const parsed = parse(Plain.serialize(change.value));
      console.info(parsed);
      this.setState({
        unit: parsed.unit.normalized,
        unitTextMatch: parsed.unit.raw,
        value: parsed.value.normalized,
        valueTextMatch: parsed.value.raw,
        ingredientTextMatch: parsed.ingredient.raw,
      });
    }
  };

  handleChange = ({ value: textState }) => {
    this.setState({
      textState,
    });
  };

  renderNode = props => {
    const { node, children } = props;
    switch (node.type) {
      case 'unit':
        return <b {...props}>Unit: {children}</b>;
      case 'value':
        return <b {...props}>Value: {children}</b>;
      case 'ingredient':
        return <b {...props}>Ingredient: {children}</b>;
    }
  };

  render() {
    const { textState } = this.state;
    const { ingredient } = this.props;

    return (
      <div>
        <Field
          required
          label="Describe the ingredient"
          helpText="Like '1/3 tablespoon nutmeg'"
        >
          <Editor
            required
            value={textState}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            renderNode={this.renderNode}
          />
        </Field>
      </div>
    );
  }
}
