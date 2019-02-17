import * as React from 'react';
import styled from 'styled-components';
import { ShapedCardProps, ShapedCardSkeletonProps } from '../types';
import Content from './components/Content';
import { ParagraphSkeleton } from 'components/skeletons';

const Wrapper = styled<{ src: string; onClick?: Function }, 'div'>('div')`
  position: relative;
  background: ${props =>
    props.src ? `url("${props.src}")` : `var(--color-gray-lightest)`};
  background-size: cover;
  background-position: top;

  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  border: 4px solid var(--color-gray-lightest);
  border-radius: var(--border-radius-lg);

  & > * {
    position: absolute;
    top: auto;
    bottom: 0;
    height: auto;
    max-height: 50%;
    width: 100%;
  }
`;

const VerticalCard = React.forwardRef<any, ShapedCardProps>(
  ({ imageSrc, children, className, shape, ...rest }, ref) => (
    <Wrapper
      ref={ref as any}
      src={imageSrc}
      className={className}
      {...rest}
      data-card-shape={shape}
    >
      <Content>{children}</Content>
    </Wrapper>
  ),
);

export default VerticalCard;

export const Skeleton = React.forwardRef<any, ShapedCardSkeletonProps>(
  ({ shape }, ref) => (
    <VerticalCard shape={shape} ref={ref}>
      <ParagraphSkeleton words={3} />
    </VerticalCard>
  ),
);
