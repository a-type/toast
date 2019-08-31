import React, { FC, useCallback, ChangeEvent } from 'react';
import { ShoppingListItem as ShoppingListItemData } from 'hooks/features/useShoppingList';
import { usePurchaseItemState } from 'hooks/features/purchasedItems';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { IngredientDisplay } from './IngredientDisplay';

export type ShoppingListItemProps = {
  item: ShoppingListItemData;
};

export const ShoppingListItem: FC<ShoppingListItemProps> = ({ item }) => {
  const { purchased, setPurchased, error } = usePurchaseItemState({
    mealDate: item.mealDate,
    ingredientId: item.ingredient.id,
  });

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setPurchased(ev.target.checked);
    },
    [setPurchased],
  );

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            checked={purchased}
            value={item.key}
          />
        }
        label={
          <IngredientDisplay
            ingredient={item.ingredient}
            multiplier={item.quantityMultiplier}
          />
        }
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};
