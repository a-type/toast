import styled from 'styled-components';
import { getSize } from 'theme';
import Span from '../Span';

const H2 = styled.h2`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  color: var(--color-gray);
  font-size: var(--font-size-lg);
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  line-height: 1.5em;
`;

H2.defaultProps = {
  spaceBelow: 'md',
};

H2.Skeleton = ({ size, ...rest }) => (
  <H2 {...rest}>
    <Span.Skeleton size={size} />
  </H2>
);

export default H2;
