import * as React from 'react';
import Grid from './Grid';
import { CardShape, ShapedCardProps } from './types';
import {
  Vertical,
  VerticalSkeleton,
  Compact,
  CompactSkeleton,
  Horizontal,
  HorizontalSkeleton,
} from './layouts';
import { cold } from 'react-hot-loader';
import useComponentSize from '@rehooks/component-size';

interface Props {
  imageSrc?: string;
  children: React.ReactNode;
  shape?: CardShape;
  ref?: React.Ref<any>;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

enum LayoutMode {
  Vertical,
  Horizontal,
  Compact,
}

const useCardLayout = (): [any, LayoutMode] => {
  const ref = React.useRef(null);
  const { width, height } = useComponentSize(ref);
  let layout;
  if (width > 300) {
    if (height >= width) {
      layout = LayoutMode.Vertical;
    } else {
      layout = LayoutMode.Horizontal;
    }
  } else {
    layout = LayoutMode.Compact;
  }

  return [ref, layout];
};

const Card: React.ComponentType<Props> & {
  Grid?: typeof Grid;
  Skeleton?: React.SFC<{ shape?: CardShape }>;
} = cold(props => {
  const [contentRef, layoutMode] = useCardLayout();

  let Layout: React.ComponentType<ShapedCardProps>;
  switch (layoutMode) {
    case LayoutMode.Compact:
      Layout = Compact;
      break;
    case LayoutMode.Horizontal:
      Layout = Horizontal;
      break;
    default:
      Layout = Vertical;
      break;
  }

  return <Layout {...props} ref={contentRef} />;
});

Card.Grid = Grid;

Card.Skeleton = cold(({ shape = CardShape.Normal }) => {
  const [contentRef, layoutMode] = useCardLayout();

  let Layout: React.ComponentType<any>;
  switch (layoutMode) {
    case LayoutMode.Compact:
      Layout = CompactSkeleton;
      break;
    case LayoutMode.Horizontal:
      Layout = HorizontalSkeleton;
      break;
    default:
      Layout = VerticalSkeleton;
      break;
  }

  return <Layout shape={shape} ref={contentRef} />;
});

export default Card;
