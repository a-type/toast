import React, { FC } from 'react';
import Icon from 'components/generic/Icon';
import { Typography, Button, Box } from '@material-ui/core';
import Link from 'components/generic/Link';
import { ShoppingCartTwoTone } from '@material-ui/icons';

export interface ShoppingListEmptyStateProps {}

export const ShoppingListEmptyState: FC<ShoppingListEmptyStateProps> = ({}) => {
  return (
    <Box
      width="100%"
      margin="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <ShoppingCartTwoTone color="disabled" fontSize="large" />
      <Typography variant="subtitle1" gutterBottom>
        You don't have anything to buy yet.
      </Typography>
      <Link to="/home">
        <Button>Plan your upcoming week</Button>
      </Link>
    </Box>
  );
};

export default ShoppingListEmptyState;
