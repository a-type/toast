import React from 'react';
import IngredientPicker from 'components/ingredients/Picker';
import IngredientEditor, {
  RecipeCreateIngredientFragment,
} from './IngredientEditor';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { H3 } from 'components/generic';

export const RecipeCreateIngredientsFragment = gql`
  fragment RecipeCreateIngredients on Recipe {
    id
    ingredients {
      ...RecipeCreateIngredient
    }
  }

  ${RecipeCreateIngredientFragment}
`;

const CreateIngredient = gql`
  mutation CreateIngredient($recipeId: ID!, $input: RecipeIngredientCreateInput!) {
    createRecipeIngredient(recipeId: $recipeId, input: $input) {
      ...RecipeCreateIngredients
    }

    ${RecipeCreateIngredientsFragment}
  }
`;

export default ({ recipeId, ingredients }) => (
  <div>
    {ingredients.map(ingredient => (
      <IngredientEditor key={ingredient.id} ingredient={ingredient} />
    ))}
    <div>
      <H3>Add an Ingredient</H3>
      <Mutation mutation={CreateIngredient}>
        {createIngredient => (
          <IngredientPicker
            onChange={async ingredient => {
              createIngredient({
                variables: {
                  recipeId,
                  input: {
                    ingredientId: ingredient.id,
                    unitValue: 1,
                  },
                },
              });
            }}
            canCreate={false}
          />
        )}
      </Mutation>
    </div>
  </div>
);
