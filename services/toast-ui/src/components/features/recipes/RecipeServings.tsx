import React, { FC } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { toReadableFraction } from 'readable-fractions';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: theme.typography.pxToRem(16),
  },
  multiplier: {
    color: theme.palette.secondary[900],
    fontWeight: 700,
  },
}));

export const RecipeServings: FC<{
  servings: number;
  servingsOverride?: number;
}> = ({ servings, servingsOverride }) => {
  const classes = useStyles({ servings, servingsOverride });

  const multiplier = servingsOverride ? servingsOverride / servings : 1;
  const multiplierText =
    multiplier === 2
      ? 'doubled'
      : multiplier === 3
      ? 'tripled'
      : 'x' + toReadableFraction(multiplier, true);

  return (
    <Typography gutterBottom className={classes.text}>
      <span>
        Servings:{' '}
        <span itemProp="recipeYield">{servingsOverride || servings}</span>
      </span>
      {servingsOverride && (
        <span className={classes.multiplier}> ({multiplierText})</span>
      )}
    </Typography>
  );
};
