import * as React from 'react';
import styled from 'styled-components';
import { getIcon, getIconColor, getForeground } from '../../common';
import { withProps } from 'recompose';
import Icon, { IconName } from 'components/generic/Icon';

const SIZE = 48;

interface CircleIconProps {
  value: string;
  name: IconName;
}

const Circle = styled<CircleIconProps, 'div'>('div')`
  background: ${({ value }) => getIconColor(value)};
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: 100%;
  display: flex;
  text-shadow: none !important;

  & > * {
    margin: auto;
  }
`;

const CircleIcon: React.SFC<CircleIconProps> = props => (
  <Circle {...props}>
    <Icon
      name={props.name}
      size={`${Math.floor(SIZE / 2)}px`}
      color={getForeground(props.value)}
    />
  </Circle>
);

export default withProps<CircleIconProps, { value: string }>(ownProps => ({
  value: ownProps.value,
  name: getIcon(ownProps.value),
}))(CircleIcon);
