import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';

export type PickerCreateIngredientVariables = {
  name: string;
};

export type PickerCreateIngredientMutation = {
  createIngredient: {
    id: string;
    name: string;
  };
};

export const Document = gql`
  mutation PickerCreateIngredient($name: String!) {
    createIngredient(input: { name: $name }) {
      id
      name
    }
  }
`;

interface PickerCreateIngredientMutationProps {
  variables?: PickerCreateIngredientVariables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      PickerCreateIngredientMutation,
      PickerCreateIngredientVariables
    >,
  ): React.ReactNode;
}

const PickerCreateIngredientMutation: React.SFC<
  PickerCreateIngredientMutationProps
> = props => (
  <Mutation<PickerCreateIngredientMutation, PickerCreateIngredientVariables>
    mutation={Document}
    {...props}
  />
);

export default PickerCreateIngredientMutation;
