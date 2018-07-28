import React from 'react';
import styled from 'styled-components';

const SIZE = 'var(--font-size-xl)';

const Outer = styled.div`
  border: 1px solid
    ${props => {
      if (props.complete) {
        return 'var(--color-positive)';
      }
      if (props.active) {
        return 'var(--color-brand)';
      }
      return 'var(--color-gray-light)';
    }};
  color: ${props =>
    props.complete ? 'var(--color-white)' : 'var(--color-black)'};
  background: ${props =>
    props.complete ? 'var(--color-positive)' : 'transparent'};
  border-radius: 100%;
  width: ${SIZE};
  height: ${SIZE};
  text-align: center;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
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
