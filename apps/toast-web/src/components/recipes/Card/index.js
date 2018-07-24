// @flow

import React from 'react';
import Box from './Box';
import Title from './Title';
import Link from 'components/generic/Link';
import { type Recipe } from 'types';
import gql from 'graphql-tag';
import Grid from './Grid';

const RecipeCard = ({
  recipe: { id, title, coverImage },
}: {
  recipe: Recipe,
}) => (
  <Link.Clear to={`/recipes/${id}`}>
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
        url
      }
    }
  `,
};

RecipeCard.Grid = Grid;

export default RecipeCard;
