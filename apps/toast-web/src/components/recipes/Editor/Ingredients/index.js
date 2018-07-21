// @flow

import React from 'react';
import { type RecipeIngredient } from 'types';
import IngredientField from './IngredientField';
import AddIngredient from './AddIngredient';
import { H2 } from 'components/typeset';
import SideControls from '../common/SideControls';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const MoveIngredient = gql`
  mutation MoveRecipeIngredient($recipeId: ID!, $input: ListMoveInput!) {
    moveRecipeIngredient(recipeId: $recipeId, input: $input) {
      id
      ingredients {
        id
        index
      }
    }
  }
`;

type Props = {
  recipeId: string,
  ingredients: Array<RecipeIngredient>,
};

export default ({ ingredients, recipeId }: Props) => (
  <Mutation mutation={MoveIngredient}>
    {moveIngredient => (
      <React.Fragment>
        <H2>Ingredients</H2>
        <SideControls />
        {ingredients.map(recipeIngredient => (
          <IngredientField
            ingredient={recipeIngredient}
            key={recipeIngredient.id}
          />
        ))}
        <AddIngredient recipeId={recipeId} />
      </React.Fragment>
    )}
  </Mutation>
);
