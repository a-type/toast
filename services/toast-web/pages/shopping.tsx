import React, { FC } from 'react';
import { ShoppingList } from 'components/shoppingList/ShoppingList';

export type ShoppingPageProps = {};

const ShoppingPage: FC<ShoppingPageProps> = ({}) => {
  return <ShoppingList />;
};

export default ShoppingPage;
