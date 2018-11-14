import React from 'react';
import IngredientPicker from 'features/ingredients/Picker';
import IngredientEditor, { fragments } from './Editor';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Field } from 'components/generic';
import { H3, HelpText } from 'components/typeset';

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

export default ({
  recipeId,
  ingredients,
  seedIngredientStrings,
  expireSeedIngredientString,
}) => (
  <div>
    {seedIngredientStrings &&
      !!seedIngredientStrings.length && (
        <div>
          <H3>Imported Ingredients</H3>
          <HelpText>Please review and save before proceeding</HelpText>
        </div>
      )}
    {seedIngredientStrings &&
      seedIngredientStrings.map(ingredientString => (
        <IngredientEditor
          key={ingredientString}
          recipeId={recipeId}
          seedText={ingredientString}
          onSave={() => expireSeedIngredientString(ingredientString)}
        />
      ))}
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
