import React, { FC, useState, useEffect } from 'react';
import { Box, DialogContent, Typography, List } from '@material-ui/core';
import {
  useShoppingList,
  ShoppingListItem as ShoppingListItemType,
} from 'hooks/features/useShoppingList';
import { ShoppingListItem } from './ShoppingListItem';
import { useCleanOldPurchasedItems } from 'hooks/features/purchasedItems';
import { sentenceCase } from 'change-case';

export type ShoppingListProps = {};

export const ShoppingList: FC<ShoppingListProps> = ({}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { data } = useShoppingList({ fromDate: startDate });
  const clean = useCleanOldPurchasedItems();

  useEffect(() => {
    clean();
  }, []);

  const groupedItems: {
    [category: string]: ShoppingListItemType[];
  } = data.reduce((groups, item) => {
    const list = groups[item.ingredient.food.category || 'miscellaneous'] || [];
    list.push(item);
    return {
      ...groups,
      [item.ingredient.food.category]: list,
    };
  }, {});

  return (
    <DialogContent>
      <Box display="flex" flexDirection="column">
        {Object.keys(groupedItems).map(category => (
          <div key={category}>
            <Typography variant="h5">{sentenceCase(category)}</Typography>
            <List>
              {groupedItems[category].map(i => (
                <ShoppingListItem item={i} key={i.key} />
              ))}
            </List>
          </div>
        ))}
      </Box>
    </DialogContent>
  );
};
