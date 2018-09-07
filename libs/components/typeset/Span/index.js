import styled from 'styled-components';
import { getSize } from 'theme';
import Skeleton from './Skeleton';

const Span = styled.span`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  display: inline-block;
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

Span.Skeleton = Skeleton;

export default Span;
