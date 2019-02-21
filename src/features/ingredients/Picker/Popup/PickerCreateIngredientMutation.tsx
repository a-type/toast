import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { PickerCreateIngredient } from 'generated/schema';

export const Document = gql`
  mutation PickerCreateIngredient($name: String!) {
    createIngredient(input: { name: $name }) {
      id
      name
    }
  }
`;

interface PickerCreateIngredientMutationProps {
  variables?: PickerCreateIngredient.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      PickerCreateIngredient.Mutation,
      PickerCreateIngredient.Variables
    >,
  ): React.ReactNode;
}

const PickerCreateIngredientMutation: React.SFC<
  PickerCreateIngredientMutationProps
> = props => (
  <Mutation<PickerCreateIngredient.Mutation, PickerCreateIngredient.Variables>
    mutation={Document}
    {...props}
  />
);

export default PickerCreateIngredientMutation;
