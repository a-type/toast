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
  if (width >= 250) {
    if (height >= 250) {
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
} = props => {
  //const [contentRef, layoutMode] = useCardLayout();
  const layoutMode: LayoutMode = LayoutMode.Vertical;

  let Layout: React.ComponentType<ShapedCardProps>;
  switch (layoutMode) {
    // case LayoutMode.Compact:
    //   Layout = Compact;
    //   break;
    // case LayoutMode.Horizontal:
    //   Layout = Horizontal;
    //   break;
    default:
      Layout = Vertical;
      break;
  }

  return <Layout {...props} />;
};

Card.Grid = Grid;

Card.Skeleton = ({ shape = CardShape.Normal }) => {
  // const [contentRef, layoutMode] = useCardLayout();
  const layoutMode: LayoutMode = LayoutMode.Vertical;

  let Layout: React.ComponentType<any>;
  switch (layoutMode) {
    // case LayoutMode.Compact:
    //   Layout = CompactSkeleton;
    //   break;
    // case LayoutMode.Horizontal:
    //   Layout = HorizontalSkeleton;
    //   break;
    default:
      Layout = VerticalSkeleton;
      break;
  }

  return <Layout shape={shape} />;
};

export default Card;
