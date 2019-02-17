import styled from 'styled-components';
import { getSize, Size } from 'theme';

const Label = styled<{ spaceBelow?: Size }, 'label'>('label')`
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
