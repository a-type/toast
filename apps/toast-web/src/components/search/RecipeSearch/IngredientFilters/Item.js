// @flow
import React from 'react';
import { Pill, Button } from 'components/generic';
import { type Ingredient } from 'types';

type Props = {
  ingredient: Ingredient,
  onRemove(ingredient: Ingredient): any,
};

export default ({ ingredient, onRemove }: Props) => (
  <Pill.InteractiveContent>
    <span style={{ textTransform: 'capitalize' }}>{ingredient.name}</span>
    <Button.Icon name="delete-button" onClick={() => onRemove(ingredient)} />
  </Pill.InteractiveContent>
);
