import * as React from 'react';
import Box from './Box';
import Link from '../Link';
import Grid from './Grid';
import Skeleton from './Skeleton';
import Overlay from './Overlay';
import { CardShape } from './types';

interface Props {
  link?: string;
  imageSrc?: string;
  children: React.ReactNode;
  shape?: CardShape;
  ref?: React.Ref<any>;
  onClick?: (ev: MouseEvent) => void;
}

const Card: React.ComponentType<Props> & {
  Grid?: typeof Grid;
  Skeleton?: typeof Skeleton;
} = React.forwardRef<any, Props>(
  ({ link, imageSrc, children, shape = 'normal', ...rest }, ref) => (
    <Link to={link} className={shape} {...rest}>
      <Box imageSrc={imageSrc} ref={ref as any}>
        {React.Children.map(
          children,
          child => child && <Overlay>{child}</Overlay>,
        )}
      </Box>
    </Link>
  ),
);

Card.Grid = Grid;
Card.Skeleton = Skeleton;

export default Card;
