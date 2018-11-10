import gql from 'graphql-tag';

export const shoppingList = gql`
  fragment ShoppingListView on ShoppingList {
    id
    ingredients {
      totalValue
      unit
      purchasedValue
      ingredient {
        id
        name
      }
    }
  }
`;
