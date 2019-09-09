import React, { FC } from 'react';
import { ShoppingList } from 'components/features/ShoppingList';

export type ShoppingPageProps = {};

export const ShoppingPage: FC<ShoppingPageProps> = ({}) => {
  return <ShoppingList />;
};
