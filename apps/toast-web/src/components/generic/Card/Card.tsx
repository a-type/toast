import React, { SFC } from 'react';
import { CardShape, ShapedCardProps } from './types';
import useComponentSize from '@rehooks/component-size';
import styled from 'styled-components';
import { loading } from 'components/effects';
import CardWrapper from './components/CardWrapper';
import {
  VerticalCardContents,
  HorizontalCardContents,
  CompactCardContents,
} from './components/CardContents';

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

export const Card: SFC<Props> = ({ onClick, imageSrc, ...props }) => {
  const [contentRef, layoutMode] = useCardLayout();

  let Layout;
  switch (layoutMode) {
    case LayoutMode.Compact:
      Layout = CompactCardContents;
      break;
    case LayoutMode.Horizontal:
      Layout = HorizontalCardContents;
      break;
    default:
      Layout = VerticalCardContents;
      break;
  }

  return (
    <CardWrapper
      ref={contentRef}
      onClick={onClick}
      data-card-shape={props.shape}
      imageSrc={imageSrc}
    >
      <Layout {...props} />
    </CardWrapper>
  );
};

export const CardGrid = styled<{ loading?: boolean }, 'div'>('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 10vh;

  grid-gap: 20px;
  grid-auto-flow: dense;
  margin-bottom: var(--spacing-lg);

  ${props => (props.loading ? loading : '')};

  @media (max-height: 600px) {
    grid-auto-rows: 20vmax;
  }

  & > * {
    height: 100%;
  }

  & > *[data-card-shape='large'] {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }

  & > *[data-card-shape='wide'] {
    grid-column-end: span 2;
  }
`;
