import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { MarkPurchased } from 'generated/schema';
import { shoppingList } from './fragments';

export const PurchaseDocument = gql`
  mutation MarkPurchased($shoppingListId: ID!, $ingredientId: ID!) {
    markPurchased(
      shoppingListId: $shoppingListId
      ingredientId: $ingredientId
    ) {
      ...ShoppingListView
    }
  }

  ${shoppingList}
`;

export const UnpurchaseDocument = gql`
  mutation MarkUnpurchased($shoppingListId: ID!, $ingredientId: ID!) {
    markUnpurchased(
      shoppingListId: $shoppingListId
      ingredientId: $ingredientId
    ) {
      ...ShoppingListView
    }
  }

  ${shoppingList}
`;

interface MarkPurchasedMutationProps {
  purchased: boolean;
  variables?: MarkPurchased.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<MarkPurchased.Mutation, MarkPurchased.Variables>,
  ): React.ReactNode;
}

const MarkPurchasedMutation: React.SFC<MarkPurchasedMutationProps> = ({
  purchased,
  ...props
}) => (
  <Mutation<MarkPurchased.Mutation, MarkPurchased.Variables>
    mutation={purchased ? UnpurchaseDocument : PurchaseDocument}
    {...props}
  />
);

export default MarkPurchasedMutation;