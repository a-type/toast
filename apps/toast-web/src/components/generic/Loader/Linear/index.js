import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    left: -5px;
  }

  100% {
    left: 0px;
  }
`;

const Line = styled.div`
  position: absolute;
  left: -10px;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed var(--color-gray);
  animation: ${scroll} 0.3s infinite;
  animation-timing-function: linear;
`;

export default () => (
  <div style={{ position: 'relative', width: '100%' }}>
    <Line />
  </div>
);
