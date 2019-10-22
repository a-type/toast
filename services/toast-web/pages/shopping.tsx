import React from 'react';
import { ShoppingList } from 'components/shoppingList/ShoppingList';
import { NextPage } from 'next';
import { ensureLoggedIn } from 'lib/auth';

export type ShoppingPageProps = {};

const ShoppingPage: NextPage<ShoppingPageProps> = ({}) => {
  return <ShoppingList />;
};

ShoppingPage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return {};
};

export default ShoppingPage;
