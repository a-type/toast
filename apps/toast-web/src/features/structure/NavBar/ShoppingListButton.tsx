import React from 'react';
import { Button, Link } from 'components/generic';
import { cold } from 'react-hot-loader';

const ShoppingListButton = props => {
  return (
    <Link nav to="/shoppingList" tabIndex={-1} {...props}>
      <Button.Icon name="check-list" />
    </Link>
  );
};

export default cold(ShoppingListButton);
