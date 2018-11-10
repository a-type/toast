import styled from 'styled-components';
import { getSize, Size } from 'theme';

const CheckboxWrapper = styled<{ spaceBelow?: Size }, 'div'>('div')`
  margin-bottom: ${props => getSize(props.spaceBelow)};
`;

CheckboxWrapper.defaultProps = {
  spaceBelow: 'md',
};

export default CheckboxWrapper;
