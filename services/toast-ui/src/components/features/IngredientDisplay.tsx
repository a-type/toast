import React, { FC } from 'react';
import { toReadableFraction } from 'readable-fractions';
import { makeStyles } from '@material-ui/core';

export type IngredientDisplayProps = {
  ingredient: {
    id: string;
    text: string;
    quantityStart?: number;
    quantityEnd?: number;
    quantity?: number;
  };
  multiplier?: number;
  showMultiplier?: boolean;
};

const useStyles = makeStyles(theme => ({
  text: {},
  multiplier: {
    color: theme.palette.grey[500],
  },
}));

export const IngredientDisplay: FC<IngredientDisplayProps> = ({
  ingredient,
  multiplier,
  showMultiplier,
}) => {
  const classes = useStyles({});

  const newQuantity = multiplier
    ? toReadableFraction(ingredient.quantity * multiplier, true)
    : toReadableFraction(ingredient.quantity, true);
  const newText = [
    ingredient.text.slice(0, ingredient.quantityStart),
    newQuantity,
    ingredient.text.slice(ingredient.quantityEnd),
  ].join('');

  return (
    <span className={classes.text}>
      <span itemProp="recipeIngredient">{newText}</span>
      {showMultiplier && multiplier && (
        <span className={classes.multiplier}>
          {' '}
          (x{toReadableFraction(multiplier, true)})
        </span>
      )}
    </span>
  );
};
