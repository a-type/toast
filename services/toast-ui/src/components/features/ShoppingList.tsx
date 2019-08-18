import React, { FC, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useShoppingList } from 'hooks/features/useShoppingList';
import { ShoppingListItem } from './ShoppingListItem';
import { useCleanOldPurchasedItems } from 'hooks/features/purchasedItems';

export type ShoppingListProps = {};

export const ShoppingList: FC<ShoppingListProps> = ({}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { data } = useShoppingList({ fromDate: startDate });
  const clean = useCleanOldPurchasedItems();

  useEffect(() => {
    clean();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {data.map(i => (
        <ShoppingListItem item={i} key={i.key} />
      ))}
    </Box>
  );
};
