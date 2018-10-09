import styled from 'styled-components';
import { Icon } from 'components/generic';
import { getIcon, getColor, getForeground } from './common';
import { withProps } from 'recompose';

const CircleIcon = styled(Icon)`
  background: ${({ value }) => getColor(value)};
  color: ${({ value }) => getForeground(value)};
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: inline-block;
  line-height: 32px;
  text-shadow: none !important;
`;

export default withProps(ownProps => ({
  name: getIcon(ownProps.value),
}))(CircleIcon);
