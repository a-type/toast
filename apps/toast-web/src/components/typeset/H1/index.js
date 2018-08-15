import styled from 'styled-components';
import { getSize } from 'theme';

const H1 = styled.h1`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  font-size: var(--font-size-xl);
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

H1.defaultProps = {
  spaceBelow: 'xl',
};

export default H1;
