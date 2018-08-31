// @flow

import React from 'react';
import { Box, Title } from './components';
import { Link } from 'components/generic';
import { type Recipe } from 'types';
import gql from 'graphql-tag';
import Grid from './Grid';
import Skeleton from './Skeleton';

const RecipeCard = ({
  recipe: { id, title, coverImage },
}: {
  recipe: Recipe,
}) => (
  <Link.Clear
    to={`/recipes/${id}`}
    className={!!coverImage ? 'large' : 'normal'}
  >
    <Box imageSrc={coverImage ? coverImage.url : null}>
      <Title hasImage={!!coverImage}>{title}</Title>
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
