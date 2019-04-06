import React, { SFC, HTMLAttributes, ReactNode } from 'react';
import { CardShape, CardLayoutMode } from './types';
import useComponentSize from '@rehooks/component-size';
import styled from 'styled-components';
import { loading } from 'components/effects';
import CardWrapper from './components/CardWrapper';
import { CardContents } from './components/CardContents';
import { CardBadge } from './components/CardBadge';
import CardActionMenu from './components/CardActionMenu';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  children?: React.ReactNode;
  shape?: CardShape;
  ref?: React.Ref<any>;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  renderBadge?: () => ReactNode;
  renderActions?: () => ReactNode;
}

export const useCardLayout = (): [any, CardLayoutMode] => {
  const ref = React.useRef(null);
  const { width, height } = useComponentSize(ref);
  let layout;
  if (width >= 250) {
    if (height >= 250) {
      layout = CardLayoutMode.Vertical;
    } else {
      layout = CardLayoutMode.Horizontal;
    }
  } else {
    layout = CardLayoutMode.Compact;
  }

  return [ref, layout];
};

export const Card: SFC<CardProps> = ({
  onClick,
  imageSrc,
  children,
  shape,
  renderBadge,
  renderActions,
  ...props
}) => {
  const [contentRef, layoutMode] = useCardLayout();

  return (
    <CardWrapper
      ref={contentRef}
      onClick={onClick}
      data-card-shape={shape}
      data-card-layout={layoutMode}
      imageSrc={imageSrc}
      {...props}
    >
      <CardContents data-card-layout={layoutMode} data-shape={shape}>
        {children}
        {renderActions && <CardActionMenu>{renderActions()}</CardActionMenu>}
      </CardContents>
      {renderBadge && <CardBadge>{renderBadge()}</CardBadge>}
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
