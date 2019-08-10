import React, { FC } from 'react';

export type IngredientDisplayProps = {
  ingredient: {
    id: string;
    text: string;
  };
  recipeId: string;
};

export const IngredientDisplay: FC<IngredientDisplayProps> = ({
  ingredient,
}) => {
  return <span>{ingredient.text}</span>;
};
