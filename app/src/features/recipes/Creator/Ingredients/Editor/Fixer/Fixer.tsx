import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SelectionEditor from './SelectionEditor/SelectionEditor';
import * as Editors from './editors';
import DeleteButton from './DeleteButton';
import { Row } from './components';
import { RecipeIngredient } from 'generated/schema';
import FixIngredientMutation from './FixIngredientMutation';

export interface IngredientEditorFixerProps {
  mutate(args: {
    variables: {
      id: string;
      input: {
        [thing: string]: string;
      };
    };
  }): Promise<any>;
  recipeIngredient: RecipeIngredient;
}

class IngredientEditorFixer extends React.PureComponent<
  IngredientEditorFixerProps
> {
  handleSelectionCommit = async (name, newText) => {
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
        start: recipeIngredient.valueStart,
        end: recipeIngredient.valueEnd,
        color: 'positive',
      },
      recipeIngredient.unit && {
        name: 'unit',
        start: recipeIngredient.unitStart,
        end: recipeIngredient.unitEnd,
        color: 'negative',
      },
      {
        name: 'ingredient',
        start: recipeIngredient.ingredientStart,
        end: recipeIngredient.ingredientEnd,
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

export default (props: { recipeIngredient: RecipeIngredient }) => (
  <FixIngredientMutation>
    {mutate => <IngredientEditorFixer mutate={mutate} {...props} />}
  </FixIngredientMutation>
);
