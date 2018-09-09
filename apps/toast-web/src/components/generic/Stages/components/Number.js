import React from 'react';
import styled from 'styled-components';

const SIZE = 'var(--font-size-xl)';

const Outer = styled.div`
  border: 2px ${props => (props.available || props.active ? 'solid' : 'dotted')}
    ${props => {
      if (props.active) {
        return 'var(--color-brand)';
      }
      if (props.complete) {
        return 'var(--color-positive)';
      }
      if (props.available) {
        return 'var(--color-brand)';
      }
      return 'var(--color-gray-light)';
    }};
  color: ${props =>
    props.active ? 'var(--color-white)' : 'var(--color-black)'};
  background: ${props => {
    if (props.active) {
      return 'var(--color-brand)';
    }
    return 'transparent';
  }};
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
