import React from 'react';
import { Button, Link } from 'components/generic';
import { cold } from 'react-hot-loader';
import { IsLoggedIn } from 'features/auth/gates';

const ShoppingListButton = props => {
  return (
    <IsLoggedIn>
      <Link nav to="/shoppingList" tabIndex={-1} {...props}>
        <Button.Icon name="check-list" />
      </Link>
    </IsLoggedIn>
  );
};

export default cold(ShoppingListButton);
