import * as React from 'react';
import styled from 'styled-components';
import { ShapedCardProps, ShapedCardSkeletonProps } from '../types';
import { P } from 'components/typeset';
import Content from './components/Content';

const Wrapper = styled<{ src: string; onClick?: Function }, 'div'>('div')`
  position: relative;
  background: ${props =>
    props.src ? `url("${props.src}")` : `var(--color-gray-lightest)`};
  background-size: cover;
  background-position: left;

  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

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

export default HorizontalCard;

export const Skeleton = React.forwardRef<any, ShapedCardSkeletonProps>(
  ({ shape }, ref) => (
    <HorizontalCard shape={shape} ref={ref}>
      <P.Skeleton />
    </HorizontalCard>
  ),
);
