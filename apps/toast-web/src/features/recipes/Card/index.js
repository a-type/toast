// @flow

import React from 'react';
import { Card } from 'components/generic';
import { type Recipe } from 'types';
import gql from 'graphql-tag';
import { path } from 'ramda';

const getClassName = recipe => {
  if (recipe.coverImage) {
    return 'large';
  }

  if (recipe.title.length > 32) {
    return 'wide';
  }

  return 'normal';
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card
    link={`/recipes/${recipe.id}`}
    imageSrc={path(['coverImage', 'url'], recipe)}
    shape={getClassName(recipe)}
  >
    {recipe.title}
  </Card>
);

RecipeCard.fragments = {
  Recipe: gql`
    fragment RecipeCard on Recipe {
      id
      title
      coverImage {
        id
        url
      }
    }
  `,
};

RecipeCard.Grid = Card.Grid;
RecipeCard.Skeleton = Card.Skeleton;

export default RecipeCard;
