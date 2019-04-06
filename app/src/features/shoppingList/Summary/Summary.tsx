import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import { Label, Link } from 'components/text';
import getNextDay from 'utils/getNextDay';
import { formatDay } from 'formatters/date';
import { ApolloError } from 'apollo-boost';

interface ShoppingListSummaryProps {
  groceryDay: { index: number; name: string };
  loading: boolean;
  error?: ApolloError;
}

export const ShoppingListSummary: FC<ShoppingListSummaryProps> = ({
  groceryDay: { index },
  loading,
  error,
}) => {
  const nextGroceryDay = formatDay(getNextDay(new Date(), index));

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box align="start" margin={{ bottom: 'large' }}>
      <Label>Shopping</Label>
      <Text margin={{ bottom: 'small' }}>Grocery day: {nextGroceryDay}</Text>
      <Link to="/shoppingList">Go to shopping list</Link>
    </Box>
  );
};

export default ShoppingListSummary;
