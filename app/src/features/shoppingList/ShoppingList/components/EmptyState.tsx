import React, { FC } from 'react';
import Icon from 'components/generic/Icon';
import { Typography, Button, Box } from '@material-ui/core';
import Link from 'components/generic/Link';

export interface ShoppingListEmptyStateProps {}

export const ShoppingListEmptyState: FC<ShoppingListEmptyStateProps> = ({}) => {
  return (
    <Box width="100%" margin="auto" alignItems="center" justifyContent="center">
      <Icon name="shopping_cart" size="20vw" color="var(--color-gray-light)" />
      <Typography>You don't have anything to buy yet.</Typography>
      <Link to="/plan">
        <Button>Plan your upcoming week</Button>
      </Link>
    </Box>
  );
};

export default ShoppingListEmptyState;
