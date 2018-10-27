import styled from 'styled-components';
import { getSize, Size } from 'theme';

interface HelpTextProps {
  spaceBelow?: Size | string;
}

const HelpText = styled<HelpTextProps, 'i'>('i')`
  font-size: var(--font-size-sm);
  color: inherit;
  opacity: 0.9;
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
  display: inline-block;
`;

HelpText.defaultProps = {
  spaceBelow: 'sm',
};

export default HelpText;
