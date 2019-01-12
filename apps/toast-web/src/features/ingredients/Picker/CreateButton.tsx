import React from 'react';
import { Icon } from 'components/generic';
import styled from 'styled-components';

const Button = styled<{ active?: boolean }, 'button'>('button')`
  background: transparent;
  border: 0;
  outline: none;
  padding: 5px;
  font-family: var(--font-default);
  cursor: pointer;
  color: ${props =>
    props.active ? 'var(--color-brand)' : 'var(--color-black)'};

  &:hover {
    color: var(--color-brand);
  }
`;

export default ({ onClick, active }) => (
  <Button onClick={onClick} active={active}>
    Create new
    <Icon name="plus-math" />
  </Button>
);
