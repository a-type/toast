import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { RejectRecipeIngredientCorrection } from 'generated/schema';

export const Document = gql`
  mutation RejectRecipeIngredientCorrection($id: ID!) {
    rejectRecipeIngredientCorrection(id: $id)
  }
`;

interface RejectRecipeIngredientCorrectionMutationProps {
  variables?: RejectRecipeIngredientCorrection.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      RejectRecipeIngredientCorrection.Mutation,
      RejectRecipeIngredientCorrection.Variables
    >,
  ): React.ReactNode;
}

const RejectRecipeIngredientCorrectionMutation: React.SFC<
  RejectRecipeIngredientCorrectionMutationProps
> = props => (
  <Mutation<
    RejectRecipeIngredientCorrection.Mutation,
    RejectRecipeIngredientCorrection.Variables
  >
    mutation={Document}
    {...props}
  />
);

export default RejectRecipeIngredientCorrectionMutation;
