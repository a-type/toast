import React from 'react';
import { Input, Field, Link } from 'components/generic';
import parse from './parseIngredient';
import { toReadableFraction } from 'readable-fractions';
import pluralize from 'pluralize';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
  getDefaultKeyBinding,
} from 'draft-js';
import SimpleDecorator from 'draft-js-simpledecorator';
import IngredientElement from './IngredientElement';
import IngredientFinder from './IngredientFinder';
import StatusRow from './StatusRow';

const InputDiv = Input.Block.withComponent('div');

export default class IngredientParsingInput extends React.Component {
  constructor(props) {
    super(props);

    this.decorator = new SimpleDecorator(
      this.findIngredientElements,
      IngredientElement,
    );

    if (props.recipeIngredient) {
      this.state = {
        textState: EditorState.createWithContent(
          ContentState.createFromText(props.recipeIngredient.text),
          this.decorator,
        ),
        focused: false,
      };
    } else {
      this.state = {
        textState: EditorState.createEmpty(this.decorator),
        focused: false,
      };
    }
  }

  componentDidMount() {
    if (this.props.seedText) {
      this.handleChange(
        EditorState.createWithContent(
          ContentState.createFromText(this.props.seedText),
          this.decorator,
        ),
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { recipeIngredient } = this.props;
    if (prevProps.recipeIngredient !== recipeIngredient) {
      this.setState({
        textState: EditorState.createWithContent(
          ContentState.createFromText(recipeIngredient.text),
          this.decorator,
        ),
      });
    }
  }

  findIngredientElements = (contentBlock, callback, contentState) => {
    const text = contentBlock.getText();
    const { value, unit, ingredient } = parse(text);

    this.findValue(value, text, callback);
    this.findUnit(unit, text, callback);
    this.findIngredient(ingredient, text, callback);
  };

  findValue = (value, text, callback) => {
    if (!value || !value.raw) {
      return;
    }

    const startIndex = text.indexOf(value.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + value.raw.length, {
        type: 'value',
        value,
      });
    }
  };

  findUnit = (unit, text, callback) => {
    if (!unit || !unit.raw) {
      return;
    }

    const startIndex = text.indexOf(unit.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + unit.raw.length, {
        type: 'unit',
        unit,
      });
    }
  };

  findIngredient = (ingredient, text, callback) => {
    if (!ingredient || !ingredient.raw) {
      return;
    }

    const startIndex = text.indexOf(ingredient.raw);
    if (startIndex >= 0) {
      callback(startIndex, startIndex + ingredient.raw.length, {
        type: 'ingredient',
        ingredient,
      });
    }
  };

  handleChange = textState => {
    const text = textState.getCurrentContent().getPlainText();
    const { value, unit, ingredient } = parse(text);

    this.props.updateParsedValues({ value, unit, ingredient, text });

    this.setState({
      textState,
    });
  };

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });

  keyBindingFn = ev => {
    if (ev.keyCode === 'Enter') {
      return 'custom-save';
    }
    return getDefaultKeyBinding(ev);
  };

  handleKeyCommand = command => {
    if (command === 'custom-save') {
      this.props.onSave();
      return 'handled';
    }
    return 'not-handled';
  };

  render() {
    const { textState, focused } = this.state;
    const {
      recipeIngredient,
      updateMatchedIngredient,
      unit,
      value,
      ingredient,
      ingredientData,
    } = this.props;

    return (
      <div>
        <Field
          required
          label="Describe the ingredient"
          helpText={!recipeIngredient && "Like '1/3 tbsp nutmeg'"}
        >
          <InputDiv focused={focused}>
            <Editor
              editorState={textState}
              stripPastedStyles
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              keyBindingFn={this.keyBindingFn}
              handleKeyCommand={this.handleKeyCommand}
            />
          </InputDiv>
          <StatusRow>
            <StatusRow.Value empty={!value || !value.normalized}>
              {value && value.normalized
                ? toReadableFraction(value.normalized, true)
                : 'Qty'}
            </StatusRow.Value>
            {unit &&
              unit.normalized && (
                <StatusRow.Unit>{unit.normalized}</StatusRow.Unit>
              )}
            <StatusRow.Ingredient empty={!ingredientData}>
              <IngredientFinder
                term={ingredient && ingredient.normalized}
                ingredient={ingredientData}
                onChange={updateMatchedIngredient}
              />
            </StatusRow.Ingredient>
          </StatusRow>
        </Field>
      </div>
    );
  }
}
