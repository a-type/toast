import React from 'react';
import Box from './Box';
import { Link } from 'components/typeset';
import Grid from './Grid';
import Skeleton from './Skeleton';
import Overlay from './Overlay';

const Card = ({ link, imageSrc, children, shape, ...rest }) => (
  <Link.Clear to={link} className={shape} {...rest}>
    <Box imageSrc={imageSrc}>
      {React.Children.map(
        children,
        child => child && <Overlay>{child}</Overlay>,
      )}
    </Box>
  </Link.Clear>
);

Card.Grid = Grid;
Card.Skeleton = Skeleton;

export default Card;
