import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Disconnected } from 'components/generic';
import logger from 'logger';
import { Box, Heading } from 'grommet';
import { HelpText } from 'components/text';
import { format } from 'date-fns';
import { ShoppingListItem } from './ShoppingListItem';
import { ShoppingListItemList } from './components/ShoppingListItemList';

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

            ingredient {
              id
              name
            }

            plannedUses {
              id
              text
              recipe {
                id
                title
              }
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

          ingredient: {
            id: string;
            name: string;
          };

          plannedUses: {
            id: string;
            text: string;

            recipe: {
              id: string;
              title: string;
            };
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
  const { data, error } = useQuery<GetShoppingListResult>(GetShoppingListQuery);

  const markPurchasedMutation = useMutation(MarkPurchasedMutation);
  const markUnpurchasedMutation = useMutation(MarkUnpurchasedMutation);

  const markPurchased = (input: { shoppingListItemId: string }) => {
    markPurchasedMutation({ variables: { input } });
  };
  const unmarkPurchased = (input: { shoppingListItemId: string }) =>
    markUnpurchasedMutation({ variables: { input } });

  if (!data || !data.me) {
    return null;
  }

  if (error) {
    logger.fatal(error);
    return <Disconnected />;
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
      <Heading margin={{ bottom: 'medium' }}>Shopping List</Heading>
      <HelpText margin={{ bottom: 'large' }}>
        Week of {format(new Date(startDate), 'MMMM Do')}
      </HelpText>
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
      </ShoppingListItemList>
    </>
  );
};

export default ShoppingList;
