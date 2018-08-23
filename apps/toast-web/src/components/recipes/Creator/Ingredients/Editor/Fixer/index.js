import React from 'react';
import { Button } from 'components/generic';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ValueTag, UnitTag, IngredientTag } from './tags';
import { StatusRow } from './components';
import { P } from 'components/typeset';

export const FixIngredientFragment = gql`
  fragment FixIngredient on RecipeIngredient {
    id
    index
    text
    unit
    unitTextMatch
    value
    valueTextMatch
    ingredientTextMatch
    ingredient {
      id
      name
    }
  }
`;

const FixIngredient = gql`
  mutation FixIngredient($id: ID!, $input: RecipeIngredientUpdateInput!) {
    updateRecipeIngredient(id: $id, input: $input) {
      ...FixIngredient
    }
  }

  ${FixIngredientFragment}
`;

class IngredientEditorFixer extends React.PureComponent {
  state = {
    selectingPart: null,
  };

  getMatchName = () => {
    const { selectingPart } = this.state;

    switch (selectingPart) {
      case 'unit':
        return 'unitTextMatch';
      case 'value':
        return 'valueTextMatch';
      default:
        return 'ingredientTextMatch';
    }
  };

  handleSelectionCommit = async () => {
    const selection = document.getSelection();
    const { mutate, recipeIngredient } = this.props;

    const selectedText = selection.toString();

    if (!recipeIngredient.text.includes(selectedText) || !selectedText.length) {
      console.error(
        `Ingredient text ${
          recipeIngredient.text
        } does not include ${selectedText}`,
      );
      return;
    }

    const matchName = this.getMatchName();

    await mutate({
      variables: {
        id: recipeIngredient.id,
        input: {
          [matchName]: selectedText,
        },
      },
    });

    this.setState({ selectingPart: null });
  };

  selectValue = () => this.setState({ selectingPart: 'value' });
  selectUnit = () => this.setState({ selectingPart: 'unit' });
  selectIngredient = () => this.setState({ selectingPart: 'ingredient' });

  renderText = () => {
    const { recipeIngredient } = this.props;

    if (!recipeIngredient) {
      return null;
    }

    const {
      unitTextMatch,
      valueTextMatch,
      ingredientTextMatch,
      text,
      ingredient,
      value,
      unit,
    } = recipeIngredient;

    const parts = [];
    let remainingText = text;

    if (valueTextMatch) {
      const split = remainingText.split(valueTextMatch);
      parts.push(<span key="value-before">{split[0]}</span>);
      parts.push(
        <ValueTag value={value} key="value">
          {valueTextMatch}
        </ValueTag>,
      );
      remainingText = split[1];
    }
    if (unitTextMatch) {
      const split = remainingText.split(unitTextMatch);
      parts.push(<span key="unit-before">{split[0]}</span>);
      parts.push(
        <UnitTag value={unit} key="unit">
          {unitTextMatch}
        </UnitTag>,
      );
      remainingText = split[1];
    }
    if (ingredientTextMatch) {
      const split = remainingText.split(ingredientTextMatch);
      parts.push(<span key="ingredient-before">{split[0]}</span>);
      parts.push(
        <IngredientTag value={ingredient} key="ingredient">
          {ingredientTextMatch}
        </IngredientTag>,
      );
      remainingText = split[1];
    }
    parts.push(<span key="remainder">{remainingText}</span>);

    return parts;
  };

  renderStatusRow = () => {
    const { selectingPart } = this.state;
    const { recipeIngredient } = this.props;

    if (!recipeIngredient) {
      return null;
    }

    const { unit, value, ingredient } = recipeIngredient;

    if (selectingPart) {
      return (
        <StatusRow>
          <span>Selecting {selectingPart}</span>
          <Button onClick={this.handleSelectionCommit}>Done</Button>
        </StatusRow>
      );
    }
  };

  render() {
    return (
      <div>
        <P spaceBelow="sm">{this.renderText()}</P>
        {this.renderStatusRow()}
      </div>
    );
  }
}

export default graphql(FixIngredient)(IngredientEditorFixer);
