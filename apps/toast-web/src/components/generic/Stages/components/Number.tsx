import React from 'react';
import styled from 'styled-components';

const SIZE = '36px';

interface NumberProps {
  available?: boolean;
  active?: boolean;
  complete?: boolean;
}

const chooseBorderStyle = props =>
  props.available || props.active ? 'solid' : 'dotted';

const chooseBorderColor = props => {
  if (props.active) {
    return 'var(--color-control-background)';
  }
  if (props.complete) {
    return 'var(--color-positive)';
  }
  if (props.available) {
    return 'var(--color-control-background)';
  }
  return 'var(--color-gray-light)';
};

const chooseColor = props =>
  props.active ? 'var(--color-control-foreground)' : 'inherit';

const chooseBackground = props => {
  if (props.active) {
    return 'var(--color-control-background)';
  }
  return 'transparent';
};

const Outer = styled<NumberProps, 'div'>('div')`
  border: 2px ${chooseBorderStyle} ${chooseBorderColor};
  color: ${chooseColor};
  background: ${chooseBackground};
  border-radius: 100%;
  width: ${SIZE};
  height: ${SIZE};
  text-align: center;
  display: flex;

  transition: 0.2s ease all;

  & > * {
    margin: auto;
  }
`;

export default ({ children, ...rest }) => (
  <Outer {...rest}>
    <span>{children}</span>
  </Outer>
);
