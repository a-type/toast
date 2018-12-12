import * as React from 'react';
import styled from 'styled-components';
import { ShapedCardProps, ShapedCardSkeletonProps } from '../types';
import { P } from 'components/typeset';
import Content from './components/Content';

const Wrapper = styled<{ src: string }, 'div'>('div')`
  position: relative;
  background: ${props =>
    props.src ? `url("${props => props.src}")` : `var(--color-gray-lightest)`};
  background-size: cover;
  background-position: left;

  border: 4px solid var(--color-gray-lightest);
  border-radius: var(--border-radius-lg);

  & > * {
    position: absolute;
    left: auto;
    right: 0;
    width: 50%;
    max-height: 100%;
    height: auto;
    top: auto;
    bottom: 0;
  }
`;

const HorizontalCard = React.forwardRef<any, ShapedCardProps>(
  ({ imageSrc, children, className, shape }, ref) => (
    <Wrapper
      ref={ref as any}
      src={imageSrc}
      className={className}
      data-card-shape={shape}
    >
      <Content>
        <div data-grid-area="content">{children}</div>
        <div data-grid-area="controls" />
      </Content>
    </Wrapper>
  ),
);

export default HorizontalCard;

export const Skeleton = React.forwardRef<any, ShapedCardSkeletonProps>(
  ({ shape }, ref) => (
    <HorizontalCard shape={shape} ref={ref}>
      <P.Skeleton />
    </HorizontalCard>
  ),
);
