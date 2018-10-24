import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';
import { getIcon, getIconColor, getForeground } from '../../common';
import { withProps } from 'recompose';

const SIZE = 48;

const CircleIcon = styled<{ value: string; name: string }>(
  ({ value, ...rest }) => <Icon {...rest} />,
)`
  background: ${({ value }) => getIconColor(value)};
  color: ${({ value }) => getForeground(value)};
  width: ${SIZE}px;
  height: ${SIZE}px;
  font-size: ${Math.floor(SIZE / 2)}px;
  border-radius: 100%;
  display: inline-block;
  text-shadow: none !important;

  &::before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default withProps(ownProps => ({
  name: getIcon(ownProps.value),
}))(CircleIcon);
