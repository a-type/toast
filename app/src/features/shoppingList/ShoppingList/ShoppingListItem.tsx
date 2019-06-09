import React, { FC } from 'react';
import { toDisplay } from 'formatters/quantity';
import { Typography, Checkbox, FormControlLabel } from '@material-ui/core';

type Food = {
  id: string;
  name: string;
};

type Recipe = {
  id: string;
  title: string;
};

type ShoppingListItemUsage = {
  recipeTitle: string;
  recipeId: string;
  ingredientTypography: string;
};

type ShoppingListItem = {
  id: string;
  totalQuantity: number;
  purchasedQuantity: number;
  unit?: string;
  food?: Food;
  displayName: string;
  plannedUses: ShoppingListItemUsage[];
};

export interface ShoppingListItemProps {
  item: ShoppingListItem;
  onMark(input: { shoppingListItemId: string }): any;
  onUnmark(input: { shoppingListItemId: string }): any;
}

export const ShoppingListItem: FC<ShoppingListItemProps> = ({
  item,
  onMark,
  onUnmark,
}) => {
  const marked = item.totalQuantity <= item.purchasedQuantity;

  const handleChange = ev => {
    if (ev.target.checked) {
      onMark({
        shoppingListItemId: item.id,
      });
    } else {
      onUnmark({ shoppingListItemId: item.id });
    }
  };

  const label = item.food ? (
    <Typography>
      {toDisplay(item.totalQuantity)}
      {item.unit ? ` ${item.unit}` : ''} {item.displayName}
    </Typography>
  ) : (
    <Typography>{item.displayName}</Typography>
  );

  const details = item.food ? (
    <Typography
      style={{
        fontStyle: 'italic',
        fontSize: 'var(--font-size-sm)',
        opacity: 0.7,
      }}
    >
      ({item.plannedUses.map(use => use.ingredientTypography).join(', ')})
    </Typography>
  ) : null;

  return (
    <>
      <FormControlLabel
        label={label}
        control={<Checkbox checked={marked} onChange={handleChange} />}
      />
      {details}
    </>
  );
};

export default ShoppingListItem;
