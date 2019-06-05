import React, { FC } from 'react';
import { CheckBox, Text } from 'grommet';
import { toDisplay } from 'formatters/quantity';

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
  ingredientText: string;
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
    <Text>
      {toDisplay(item.totalQuantity)}
      {item.unit ? ` ${item.unit}` : ''} {item.displayName}
    </Text>
  ) : (
    <Text>{item.displayName}</Text>
  );

  const details = item.food ? (
    <Text
      style={{
        fontStyle: 'italic',
        fontSize: 'var(--font-size-sm)',
        opacity: 0.7,
      }}
    >
      ({item.plannedUses.map(use => use.ingredientText).join(', ')})
    </Text>
  ) : null;

  return (
    <>
      <CheckBox checked={marked} onChange={handleChange} label={label} />
      {details}
    </>
  );
};

export default ShoppingListItem;
