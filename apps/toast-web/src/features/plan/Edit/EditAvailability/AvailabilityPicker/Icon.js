import styled from 'styled-components';
import { Icon } from 'components/generic';
import { getIcon, getIconColor, getForeground } from '../../common';
import { withProps } from 'recompose';

const SIZE = 48;

const CircleIcon = styled(Icon)`
  background: ${({ value }) => getIconColor(value)};
  color: ${({ value }) => getForeground(value)};
  width: ${SIZE}px;
  height: ${SIZE}px;
  font-size: ${Math.floor(SIZE / 2)}px;
  border-radius: 100%;
  display: inline-block;
  line-height: ${SIZE}px;
  text-shadow: none !important;
`;

export default withProps(ownProps => ({
  name: getIcon(ownProps.value),
}))(CircleIcon);
