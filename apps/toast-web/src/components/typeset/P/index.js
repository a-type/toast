import styled from 'styled-components';
import { getSize } from 'theme';

const P = styled.p`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

P.defaultProps = {
  spaceBelow: 'lg',
};

export default P;
