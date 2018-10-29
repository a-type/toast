import * as React from 'react';
import Box from './Box';
import Grid from './Grid';
import Skeleton from './Skeleton';
import Overlay from './Overlay';
import { CardShape } from './types';

interface Props {
  imageSrc?: string;
  children: React.ReactNode;
  shape?: CardShape;
  ref?: React.Ref<any>;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.ComponentType<Props> & {
  Grid?: typeof Grid;
  Skeleton?: typeof Skeleton;
} = React.forwardRef<any, Props>(
  ({ imageSrc, children, shape = 'normal', ...rest }, ref) => (
    <Box imageSrc={imageSrc} ref={ref as any} className={shape} {...rest}>
      {React.Children.map(
        children,
        child => child && <Overlay>{child}</Overlay>,
      )}
    </Box>
  ),
);

Card.Grid = Grid;
Card.Skeleton = Skeleton;

export default Card;
