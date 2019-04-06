import React, { FC } from 'react';
import { CheckBox, Text } from 'grommet';
import { toDisplay } from 'formatters/quantity';

type Ingredient = {
  id: string;
  name: string;
};

type Recipe = {
  id: string;
  title: string;
};

type RecipeIngredient = {
  id: string;
  text: string;
  recipe: Recipe;
};

type ShoppingListItem = {
  id: string;
  totalQuantity: number;
  purchasedQuantity: number;
  unit?: string;
  ingredient?: Ingredient;
  displayName: string;
  plannedUses: RecipeIngredient[];
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

  const label = item.ingredient ? (
    <Text>
      {toDisplay(item.totalQuantity)}
      {item.unit ? ` ${item.unit}` : ''} {item.displayName}
    </Text>
  ) : (
    <Text>{item.displayName}</Text>
  );

  const details = item.ingredient ? (
    <Text
      style={{
        fontStyle: 'italic',
        fontSize: 'var(--font-size-sm)',
        opacity: 0.7,
      }}
    >
      ({item.plannedUses.map(use => use.text).join(', ')})
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
