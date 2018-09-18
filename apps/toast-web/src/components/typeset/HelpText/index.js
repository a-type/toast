import styled from 'styled-components';
import { getSize } from 'theme';

const HelpText = styled.i`
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

HelpText.defaultProps = {
  spaceBelow: 'sm',
};

export default HelpText;
