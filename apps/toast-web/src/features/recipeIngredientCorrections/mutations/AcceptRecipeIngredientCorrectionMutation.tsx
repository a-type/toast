import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { AcceptRecipeIngredientCorrection } from 'generated/schema';

export const Document = gql`
  mutation AcceptRecipeIngredientCorrection($id: ID!) {
    acceptRecipeIngredientCorrection(id: $id)
  }
`;

interface AcceptRecipeIngredientCorrectionMutationProps {
  variables?: AcceptRecipeIngredientCorrection.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      AcceptRecipeIngredientCorrection.Mutation,
      AcceptRecipeIngredientCorrection.Variables
    >,
  ): React.ReactNode;
}

const AcceptRecipeIngredientCorrectionMutation: React.SFC<
  AcceptRecipeIngredientCorrectionMutationProps
> = props => (
  <Mutation<
    AcceptRecipeIngredientCorrection.Mutation,
    AcceptRecipeIngredientCorrection.Variables
  >
    mutation={Document}
    {...props}
  />
);

export default AcceptRecipeIngredientCorrectionMutation;
