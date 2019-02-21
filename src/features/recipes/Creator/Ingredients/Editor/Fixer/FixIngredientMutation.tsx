import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { FixIngredient } from 'generated/schema';
import { recipeIngredient } from './fragments';

export const Document = gql`
  mutation FixIngredient($id: ID!, $input: RecipeIngredientUpdateInput!) {
    updateRecipeIngredient(id: $id, input: $input) {
      ...FixRecipeIngredient
    }
  }

  ${recipeIngredient}
`;

interface FixIngredientMutationProps {
  variables?: FixIngredient.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<FixIngredient.Mutation, FixIngredient.Variables>,
  ): React.ReactNode;
}

const FixIngredientMutation: React.SFC<FixIngredientMutationProps> = props => (
  <Mutation<FixIngredient.Mutation, FixIngredient.Variables>
    mutation={Document}
    {...props}
  />
);

export default FixIngredientMutation;
