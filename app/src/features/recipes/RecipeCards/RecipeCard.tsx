import React, { FC } from 'react';
import { Card, CardShape, CardProps } from 'components/generic/Card';
import { path } from 'ramda';

const truncate = (text: string, length = 40) => {
  const shorter = text.slice(0, length);
  if (shorter.length !== text.length) {
    return shorter.slice(0, length - 3) + '...';
  }
  return shorter;
};

const getShape = recipe => {
  if (recipe.coverImage) {
    return CardShape.Large;
  }

  return CardShape.Normal;
};

export interface RecipeCardRecipe {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
  attribution: string;
}

const RecipeCard: FC<
  CardProps & {
    recipe: RecipeCardRecipe;
  }
> = ({ recipe, ...props }) => (
  <Card
    imageSrc={path(['coverImage', 'url'], recipe)}
    shape={getShape(recipe)}
    title={truncate(recipe.title)}
    {...props}
  >
    {recipe.attribution}
  </Card>
);

export default RecipeCard;
