import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { getSize, Size } from 'theme';
import Span from '../Span';

export type H3Props = {
  spaceBelow: Size | string;
};

export type H3SkeletonProps = H3Props & {
  size: number;
};

interface H3WithSkeleton extends StyledComponentClass<H3Props, {}> {
  Skeleton?: React.StatelessComponent<H3SkeletonProps>;
}

const H3 = styled<H3Props, 'h3'>('h3')`
  font-family: var(--font-fancy);
  font-weight: var(--bold);
  font-size: var(--font-size-md);
  color: var(--color-heading);
  opacity: 0.93;
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.03em);
  line-height: 1.5em;
` as H3WithSkeleton;

H3.defaultProps = {
  spaceBelow: 'md',
};

H3.Skeleton = ({ size, ...rest }: H3SkeletonProps) => (
  <H3 {...rest}>
    <Span.Skeleton size={size} />
  </H3>
);

export default H3;
