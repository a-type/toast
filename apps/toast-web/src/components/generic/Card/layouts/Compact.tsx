import * as React from 'react';
import styled from 'styled-components';
import { gridAreas } from 'components/effects';
import { ShapedCardProps, ShapedCardSkeletonProps } from '../types';
import { P } from 'components/typeset';
import Content from './components/Content';

const Image = styled<{ src: string }, 'div'>('div')`
  border-radius: var(--border-radius-md);
  background: url("${props => props.src}");
  background-size: cover;
  background-position: center;
`;

const Border = styled.div`
  border: 2px solid var(--color-gray-lightest);
  border-radius: var(--border-radius-lg);
`;

const CompactCard = React.forwardRef<any, ShapedCardProps>(
  ({ imageSrc, children, className, shape }, ref) => (
    <Border ref={ref} className={className} data-card-shape={shape}>
      <Content>{children}</Content>
    </Border>
  ),
);

export default CompactCard;

export const Skeleton = React.forwardRef<any, ShapedCardSkeletonProps>(
  ({ shape }, ref) => (
    <CompactCard shape={shape} ref={ref}>
      <P.Skeleton />
    </CompactCard>
  ),
);
