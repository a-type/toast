import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { CorrectIngredient } from 'generated/schema';

export const Document = gql`
  mutation CorrectIngredient($input: RecipeIngredientCorrectionSubmitInput!) {
    submitRecipeIngredientCorrection(input: $input)
  }
`;

interface CorrectIngredientMutationProps {
  variables?: CorrectIngredient.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      CorrectIngredient.Mutation,
      CorrectIngredient.Variables
    >,
  ): React.ReactNode;
}

const CorrectIngredientMutation: React.SFC<
  CorrectIngredientMutationProps
> = props => (
  <Mutation<CorrectIngredient.Mutation, CorrectIngredient.Variables>
    mutation={Document}
    {...props}
  />
);

export default CorrectIngredientMutation;
