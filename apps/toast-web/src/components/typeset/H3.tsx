import * as React from 'react';
import styled from 'styled-components';
import { getSize } from 'theme';
import Span from './Span';
import { HeadingProps, HeadingWithSkeleton } from './types';

const H3 = styled<HeadingProps, 'h3'>('h3')`
  font-family: var(--font-fancy);
  font-weight: var(--bold);
  font-size: var(--font-size-md);
  color: var(--color-heading);
  opacity: 0.93;
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.03em);
  line-height: 1.5em;
` as HeadingWithSkeleton;

H3.defaultProps = {
  spaceBelow: 'md',
};

H3.Skeleton = ({ size, ...rest }) => (
  <H3 {...rest}>
    <Span.Skeleton size={size} />
  </H3>
);

export default H3;
