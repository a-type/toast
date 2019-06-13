import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import { ShoppingListItem } from './ShoppingListItem';
import { ShoppingListItemList } from './components/ShoppingListItemList';
import ErrorMessage from 'components/generic/ErrorMessage';
import ShoppingListEmptyState from './components/EmptyState';
import { Loader } from 'components/generic/Loader/Loader';
import { Typography } from '@material-ui/core';

const GetShoppingListQuery = gql`
  query GetShoppingListQuery {
    me {
      id

      group {
        id

        shoppingList {
          id
          startDate
          endDate

          items {
            id
            totalQuantity
            purchasedQuantity
            unit
            displayName

            food {
              id
              name
            }

            plannedUses {
              ingredientText
              recipeTitle
              recipeId
            }
          }
        }
      }
    }
  }
`;

type GetShoppingListResult = {
  me: {
    id: string;
    group: {
      id: string;
      shoppingList: {
        id: string;
        startDate: string;
        endDate: string;

        items: {
          id: string;
          totalQuantity: number;
          purchasedQuantity: number;
          unit: string;
          displayName: string;

          food: {
            id: string;
            name: string;
          };

          plannedUses: {
            ingredientText: string;
            recipeId: string;
            recipeTitle: string;
          }[];
        }[];
      };
    };
  };
};

const MarkPurchasedMutation = gql`
  mutation MarkPurchasedItem($input: MarkPurchasedItemInput!) {
    markPurchasedItem(input: $input) {
      id
      totalQuantity
      purchasedQuantity
      unit
    }
  }
`;

const MarkUnpurchasedMutation = gql`
  mutation MarkUnpurchasedItem($input: MarkUnpurchasedItemInput!) {
    markUnpurchasedItem(input: $input) {
      id
      totalQuantity
      purchasedQuantity
      unit
    }
  }
`;

export interface ShoppingListProps {}

export const ShoppingList: FC<ShoppingListProps> = () => {
  const { data, error, loading } = useQuery<GetShoppingListResult>(
    GetShoppingListQuery,
  );

  const markPurchasedMutation = useMutation(MarkPurchasedMutation);
  const markUnpurchasedMutation = useMutation(MarkUnpurchasedMutation);

  const markPurchased = (input: { shoppingListItemId: string }) => {
    markPurchasedMutation({ variables: { input } });
  };
  const unmarkPurchased = (input: { shoppingListItemId: string }) =>
    markUnpurchasedMutation({ variables: { input } });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const {
    me: {
      group: {
        shoppingList: { startDate, endDate, items },
      },
    },
  } = data;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Week of {format(new Date(startDate), 'MMMM Do')}
      </Typography>
      <ShoppingListItemList>
        {items.map(item => (
          <li key={item.id}>
            <ShoppingListItem
              item={item}
              onMark={markPurchased}
              onUnmark={unmarkPurchased}
            />
          </li>
        ))}
        {!items.length && <ShoppingListEmptyState />}
      </ShoppingListItemList>
    </>
  );
};

export default ShoppingList;
