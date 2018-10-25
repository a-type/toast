import styled from 'styled-components';
import { getSize } from 'theme';

const Label = styled.label`
  font-style: italic;
  color: inherit;
  opacity: 0.9;
  font-size: var(--font-size-sm);
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

Label.defaultProps = {
  spaceBelow: 'sm',
};

export default Label;