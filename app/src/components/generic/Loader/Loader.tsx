import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    left: -50%;
    top: 150%;
    z-index: 10;
    transform: translate(-50%, -50%) scale(0.8);
  }

  50% {
    left: 50%;
    top: 50%;
    z-index: 5;
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    left: 50%;
    top: 50%;
    z-index: 0;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Wave = styled.div`
  animation: ${animation} 6s infinite ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;

  &:nth-child(1) {
    animation-delay: 0;
    background: var(--color-dark);
  }
  &:nth-child(2) {
    animation-delay: 1s;
    background: var(--color-negative);
  }
  &:nth-child(3) {
    animation-delay: 2s;
    background: var(--color-brand);
  }
  &:nth-child(4) {
    animation-delay: 4s;
    background: var(--color-positive-light);
  }
`;

const Circle = styled<{ size: string }, 'div'>('div')`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  width: ${props => props.size};
  height: ${props => props.size};
  background: var(--color-positive-light);
`;

export const Loader: FC<{ size?: string }> = ({ size = '24px' }) => {
  return (
    <Circle size={size}>
      <Wave />
      <Wave />
      <Wave />
      <Wave />
    </Circle>
  );
};

export default Loader;
