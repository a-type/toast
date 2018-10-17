import styled from 'styled-components';
import { getSize } from 'theme';
import Span from '../Span';

const H3 = styled.h3`
  font-family: var(--font-fancy);
  font-weight: var(--bold);
  font-size: var(--font-size-md);
  color: var(--color-heading);
  opacity: 0.93;
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  line-height: 1.5em;
`;

H3.defaultProps = {
  spaceBelow: 'md',
};

H3.Skeleton = ({ size, ...rest }) => (
  <H3 {...rest}>
    <Span.Skeleton size={size} />
  </H3>
);

export default H3;
