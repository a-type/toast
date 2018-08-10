import React from 'react';
import { Input, Field, Link } from 'components/generic';
import parse from './parseIngredient';
import { toReadableFraction } from 'readable-fractions';
import pluralize from 'pluralize';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import Ingredient from './Ingredient';
import Unit from './Unit';
import Value from './Value';

export default class IngredientParsingInput extends React.PureComponent {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: this.findValue,
        component: Value,
      },
      {
        strategy: this.findUnit,
        component: Unit,
      },
      {
        strategy: this.findIngredient,
        component: Ingredient,
      },
    ]);

    this.state = {
      textState: EditorState.createEmpty(decorator),
      active: !this.props.unitValue,
      unit: null,
      unitTextMatch: null,
      value: null,
      valueTextMatch: null,
      ingredientTextMatch: null,
    };
  }

  findValue = (contentBlock, callback, contentState) => {
    const { valueTextMatch } = this.state;
    const plainText = contentState.getPlainText();
    const { value } = parse(plainText);

    const startIndex = plainText.indexOf(value.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + value.raw.length);
    }
  };

  findUnit = (contentBlock, callback, contentState) => {
    const { unitTextMatch } = this.state;
    const plainText = contentState.getPlainText();
    const { unit } = parse(plainText);

    const startIndex = plainText.indexOf(unit.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + unit.raw.length);
    }
  };

  findIngredient = (contentBlock, callback, contentState) => {
    const { ingredientTextMatch } = this.state;
    const plainText = contentState.getPlainText();
    const { ingredient } = parse(plainText);

    const startIndex = plainText.indexOf(ingredient.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + ingredient.raw.length);
    }
  };

  handleChange = textState => {
    this.setState({
      textState,
    });
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
            editorState={textState}
            onChange={this.handleChange}
          />
        </Field>
      </div>
    );
  }
}
