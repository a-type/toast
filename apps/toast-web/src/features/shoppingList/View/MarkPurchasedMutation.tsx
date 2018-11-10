import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { MarkPurchased } from 'generated/schema';
import { shoppingList } from './fragments';

export const Document = gql`
  mutation MarkPurchased($ingredientId: ID!, $value: Float!, $unit: String) {
    markPurchased(ingredientId: $ingredientId, value: $value, unit: $unit) {
      ...ShoppingListView
    }
  }

  ${shoppingList}
`;

interface MarkPurchasedMutationProps {
  variables?: MarkPurchased.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<MarkPurchased.Mutation, MarkPurchased.Variables>,
  ): React.ReactNode;
}

const MarkPurchasedMutation: React.SFC<MarkPurchasedMutationProps> = props => (
  <Mutation<MarkPurchased.Mutation, MarkPurchased.Variables>
    mutation={Document}
    {...props}
  />
);

export default MarkPurchasedMutation;
