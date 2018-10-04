import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

const fadeIn = keyframes`
  from {
    opacity: 0;
    margin-bottom: -80px;
  }

  to {
    opacity: 1;
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  pointer-events: initial;
  margin-bottom: var(--spacing-sm);

  & > * {
    margin-left: var(--spacing-sm);
    margin-right: var(--spacing-sm);
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export default ({ onChange, innerRef, ...rest }) => (
  <Row innerRef={innerRef} {...rest}>
    {['SKIP', 'EAT_OUT', 'NONE', 'SHORT', 'MEDIUM', 'LONG'].map(value => (
      <Button value={value} key={value} onClick={() => onChange(value)} />
    ))}
  </Row>
);
