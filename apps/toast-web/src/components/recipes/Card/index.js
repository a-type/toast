// @flow

import React from 'react';
import Box from './Box';
import Title from './Title';
import Link from 'components/generic/Link';
import { type Recipe } from 'types';

export default ({ recipe: { id, title, coverImage } }: { recipe: Recipe }) => (
  <Link.Clear to={`/recipes/${id}`}>
    <Box imageSrc={coverImage ? coverImage.url : null}>
      <Title>{title}</Title>
    </Box>
  </Link.Clear>
);
