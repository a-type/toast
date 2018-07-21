// @flow
import React from 'react';
import Field from './Field';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { type RecipeIngredient } from 'types';

const UpdateIngredient = gql`
  mutation UpdateRecipeIngredient(
    $id: ID!
    $input: RecipeIngredientUpdateInput!
  ) {
    updateRecipeIngredient(id: $id, input: $input) {
      id
      unit
      unitValue
      note
      ingredient {
        id
        name
      }
    }
  }
`;

export type Props = {
  ingredient: RecipeIngredient,
};

export default ({ ingredient }: Props) => (
  <Mutation mutation={UpdateIngredient}>
    {updateIngredient => (
      <Field
        index={ingredient.index}
        ingredient={ingredient}
        onChange={({ ingredientId, unit, unitValue, note }) => {
          updateIngredient({
            variables: {
              id: ingredient.id,
              input: {
                ingredientId,
                unit,
                unitValue,
                note,
              },
            },
          });
        }}
      />
    )}
  </Mutation>
);
