import React from 'react';
import styled from 'styled-components';
import { getSize } from 'theme';
import Span from '../Span';

const H1 = styled.h1`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  font-size: var(--font-size-xl);
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  line-height: 1.5;
  color: var(--color-dark);
`;

H1.defaultProps = {
  spaceBelow: 'lg',
};

H1.Skeleton = ({ size, ...rest }) => (
  <H1 {...rest}>
    <Span.Skeleton size={size} />
  </H1>
);

export default H1;
