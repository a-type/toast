import styled from 'styled-components';
import { getSize } from 'theme';

const Aside = styled.i`
  color: var(--color-gray);
  display: block;
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

Aside.defaultProps = {
  spaceBelow: 'lg',
};

export default Aside;
