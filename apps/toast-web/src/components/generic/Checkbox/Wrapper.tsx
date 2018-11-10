import styled from 'styled-components';
import { getSize, Size } from 'theme';

export default styled<{ spaceBelow?: Size }, 'div'>('div')`
  margin-bottom: ${props => getSize(props.spaceBelow) || 'var(--spacing-lg)'};
`;
