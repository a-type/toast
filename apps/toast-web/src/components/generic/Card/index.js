import React from 'react';
import Box from './Box';
import Title from './Title';
import { Link } from 'components/typeset';
import Grid from './Grid';
import Skeleton from './Skeleton';

const Card = ({ link, imageSrc, children, shape }) => (
  <Link.Clear to={link} className={shape}>
    <Box imageSrc={imageSrc}>
      <Title hasImage={!!imageSrc}>{children}</Title>
    </Box>
  </Link.Clear>
);

Card.Grid = Grid;
Card.Skeleton = Skeleton;

export default Card;
