import * as React from 'react';
import styled from 'styled-components';
import { getSize } from 'theme';
import Span from './Span';
import { HeadingProps, HeadingWithSkeleton } from './types';

const H2 = styled<HeadingProps, 'h2'>('h2')`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  color: var(--color-heading);
  opacity: 0.93;
  font-size: var(--font-size-lg);
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  line-height: 1.5em;
` as HeadingWithSkeleton;

H2.defaultProps = {
  spaceBelow: 'md',
};

H2.Skeleton = ({ size, ...rest }) => (
  <H2 {...rest}>
    <Span.Skeleton size={size} />
  </H2>
);

export default H2;
