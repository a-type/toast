import styled from 'styled-components';
import { getSize } from 'theme';

const H3 = styled.h3`
  font-family: var(--font-fancy);
  font-weight: var(--bold);
  font-size: var(--font-size-md);
  margin-top: -0.1em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  line-height: 1.5em;
`;

H3.defaultProps = {
  spaceBelow: 'md',
};

export default H3;
