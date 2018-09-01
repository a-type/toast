// @flow

import React from 'react';
import { Box, Title } from './components';
import { Link } from 'components/generic';
import { type Recipe } from 'types';
import gql from 'graphql-tag';
import Grid from './Grid';
import Skeleton from './Skeleton';

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
  <Link.Clear to={`/recipes/${recipe.id}`} className={getClassName(recipe)}>
    <Box imageSrc={recipe.coverImage ? recipe.coverImage.url : null}>
      <Title hasImage={!!recipe.coverImage}>{recipe.title}</Title>
    </Box>
  </Link.Clear>
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

RecipeCard.Grid = Grid;
RecipeCard.Skeleton = Skeleton;

export default RecipeCard;
