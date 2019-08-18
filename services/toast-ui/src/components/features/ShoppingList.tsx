import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core';
import { useShoppingList } from 'hooks/features/useShoppingList';

export type ShoppingListProps = {};

export const ShoppingList: FC<ShoppingListProps> = ({}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { data } = useShoppingList({ fromDate: startDate });

  return (
    <div>
      {data.map(i => (
        <div key={i.id}>{i.text}</div>
      ))}
    </div>
  );
};
