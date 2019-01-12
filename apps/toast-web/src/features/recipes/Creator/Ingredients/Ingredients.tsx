import React from 'react';
import IngredientEditor, { fragments } from './Editor/Editor';
import gql from 'graphql-tag';

export const RecipeCreateIngredientsFragment = gql`
  fragment RecipeCreateIngredients on Recipe {
    id
    ingredients {
      ...ParseIngredient
      ...FixIngredient
    }
  }

  ${fragments.ParseIngredient}
  ${fragments.FixIngredient}
`;

export default ({ recipeId, ingredients }) => (
  <div>
    {ingredients.map(ingredient => (
      <IngredientEditor
        key={ingredient.id}
        recipeIngredient={ingredient}
        recipeId={recipeId}
      />
    ))}
    <IngredientEditor recipeId={recipeId} />
  </div>
);
