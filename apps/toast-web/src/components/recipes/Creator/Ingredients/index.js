import React from 'react';
import IngredientPicker from 'components/ingredients/Picker';
import IngredientEditor, {
  RecipeCreateIngredientFragment,
} from './IngredientEditor';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { H3, Field } from 'components/generic';

export const RecipeCreateIngredientsFragment = gql`
  fragment RecipeCreateIngredients on Recipe {
    id
    ingredients {
      ...RecipeCreateIngredient
    }
  }

  ${RecipeCreateIngredientFragment}
`;

export default ({ recipeId, ingredients }) => (
  <div>
    {ingredients.map(ingredient => (
      <IngredientEditor key={ingredient.id} recipeIngredient={ingredient} />
    ))}
    <H3>Add an Ingredient</H3>
    <IngredientEditor recipeId={recipeId} />
  </div>
);
