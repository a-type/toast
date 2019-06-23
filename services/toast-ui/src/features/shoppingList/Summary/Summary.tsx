import React, { FC } from 'react';
import Link from 'components/generic/Link';
import getNextDay from 'utils/getNextDay';
import { formatDay } from 'formatters/date';
import { ApolloError } from 'apollo-boost';
import ErrorMessage from 'components/generic/ErrorMessage';
import { BoxSkeleton } from 'components/skeletons/Box';
import { Box, Typography, Button } from '@material-ui/core';

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
    return <BoxSkeleton height="80px" />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box alignItems="start" mb={3}>
      <Typography gutterBottom>Grocery day: {nextGroceryDay}</Typography>
      <Link to="/shoppingList">
        <Button>Go to shopping list</Button>
      </Link>
    </Box>
  );
};

export default ShoppingListSummary;
