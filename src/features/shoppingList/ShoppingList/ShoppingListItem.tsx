import React, { FC } from 'react';
import { CheckBox } from 'grommet';

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
  totalQuantitiy: number;
  purchasedQuantity: number;
  unit?: string;
  ingredient?: Ingredient;
  plannedUses: RecipeIngredient[];
};

export interface ShoppingListItemProps {
  item: ShoppingListItem;
  onMark(input: {
    shoppingListItemId: string;
    quantity: number;
    unit?: string;
  }): any;
  onUnmark(input: { shoppingListItemId: string }): any;
}

export const ShoppingListItem: FC<ShoppingListItemProps> = ({
  item,
  onMark,
  onUnmark,
}) => {
  const displayName = item.ingredient
    ? item.ingredient.name
    : item.plannedUses[0].text;

  const marked = item.totalQuantitiy === item.purchasedQuantity;

  const handleChange = ev => {
    if (ev.target.checked) {
      onUnmark({ shoppingListItemId: item.id });
    } else {
      onMark({
        shoppingListItemId: item.id,
        quantity: item.totalQuantitiy,
        unit: item.unit,
      });
    }
  };

  return (
    <CheckBox checked={marked} onChange={handleChange} label={displayName} />
  );
};

export default ShoppingListItem;
