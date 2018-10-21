import * as React from 'react';
import Box from './Box';
import Link from '../Link';
import Grid from './Grid';
import Skeleton from './Skeleton';
import Overlay from './Overlay';
import { CardShape } from './types';

export type Props = {
  link?: string;
  imageSrc?: string;
  children: React.ReactNode;
  shape?: CardShape;
};

const Card = ({
  link,
  imageSrc,
  children,
  shape = 'normal',
  ...rest
}: Props) => (
  <Link to={link} className={shape} {...rest}>
    <Box imageSrc={imageSrc}>
      {React.Children.map(
        children,
        child => child && <Overlay>{child}</Overlay>,
      )}
    </Box>
  </Link>
);

Card.Grid = Grid;
Card.Skeleton = Skeleton;

export default Card;
