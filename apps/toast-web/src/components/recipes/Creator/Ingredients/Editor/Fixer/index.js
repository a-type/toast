import React from 'react';
import { Button } from 'components/generic';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SelectionEditor from './SelectionEditor';
import * as Editors from './editors';
import { compose } from 'recompose';
import DeleteButton from './DeleteButton';
import { Row } from './components';

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
  handleSelectionCommit = async (name, newText) => {
    const selection = document.getSelection();
    const { mutate, recipeIngredient } = this.props;

    if (!recipeIngredient.text.includes(newText) || !newText.length) {
      console.error(
        `Ingredient text ${recipeIngredient.text} does not include ${newText}`,
      );
      return;
    }

    const matchName = `${name}TextMatch`;

    await mutate({
      variables: {
        id: recipeIngredient.id,
        input: {
          [matchName]: newText,
        },
      },
    });

    this.setState({ selectingPart: null });
  };

  handleIngredientChange = async newIngredient => {
    const { recipeIngredient, mutate } = this.props;

    await mutate({
      variables: {
        id: recipeIngredient.id,
        input: {
          ingredientId: newIngredient.id,
        },
      },
    });
  };

  render() {
    const { recipeIngredient } = this.props;

    const selections = [
      {
        name: 'value',
        text: recipeIngredient.valueTextMatch,
        color: 'positive',
      },
      recipeIngredient.unit && {
        name: 'unit',
        text: recipeIngredient.unitTextMatch,
        color: 'negative',
      },
      {
        name: 'ingredient',
        text: recipeIngredient.ingredientTextMatch,
        color: 'brand',
        tipContent: (
          <Editors.Ingredient
            value={recipeIngredient.ingredient}
            onChange={this.handleIngredientChange}
          />
        ),
      },
    ].filter(Boolean);

    return (
      <Row>
        <SelectionEditor
          value={recipeIngredient.text}
          selections={selections}
          onSelectionChanged={this.handleSelectionCommit}
        />
        <DeleteButton ingredientId={recipeIngredient.id} />
      </Row>
    );
  }
}

export default graphql(FixIngredient)(IngredientEditorFixer);
