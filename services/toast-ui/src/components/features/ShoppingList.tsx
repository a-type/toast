import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core';

export type ShoppingListProps = {};

export const ShoppingList: FC<ShoppingListProps> = ({}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return <Box />;
};
