import React, { FC } from 'react';
import { Box, Text, Button } from 'grommet';
import { Icon, Link } from 'components/generic';

export interface ShoppingListEmptyStateProps {}

export const ShoppingListEmptyState: FC<ShoppingListEmptyStateProps> = ({}) => {
  return (
    <Box width="100%" margin="auto" align="center" justify="center">
      <Icon name="shopping_cart" size="20vw" color="var(--color-gray-light)" />
      <Text textAlign="center" size="large" margin={{ bottom: 'medium' }}>
        You don't have anything to buy yet.
      </Text>
      <Link to="/plan">
        <Button label="Plan your upcoming week" primary />
      </Link>
    </Box>
  );
};

export default ShoppingListEmptyState;
