import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Disconnected } from 'components/generic';
import logger from 'logger';
import { Box, Heading } from 'grommet';
import { HelpText } from 'components/text';
import { format } from 'date-fns';
import { ShoppingListItem } from './ShoppingListItem';

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

            ingredient {
              id
              name

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
  }
`;

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
  const { data, error } = useQuery(GetShoppingListQuery);

  const markPurchasedMutation = useMutation(MarkPurchasedMutation);
  const markUnpurchasedMutation = useMutation(MarkUnpurchasedMutation);

  const markPurchased = (input: {
    shoppingListItemId: string;
    quantity: number;
    unit?: string;
  }) => markPurchasedMutation({ variables: { input } });
  const unmarkPurchased = (input: { shoppingListItemId: string }) =>
    markUnpurchasedMutation({ variables: { input } });

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
      <Heading>Shopping List</Heading>
      <HelpText>Week of {format(new Date(startDate), 'MMMM Do')}</HelpText>
      <Box>
        {items.map(item => (
          <ShoppingListItem
            item={item}
            key={item.id}
            onMark={markPurchased}
            onUnmark={unmarkPurchased}
          />
        ))}
      </Box>
    </>
  );
};

export default ShoppingList;
