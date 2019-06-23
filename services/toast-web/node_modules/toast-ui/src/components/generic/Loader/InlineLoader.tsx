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
  animation: ${animation} 4s infinite ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  animation-fill-mode: forwards;
  transform: translate(-50%, -50%) scale(0);

  &:nth-child(1) {
    animation-delay: 0;
    background: var(--color-dark);
  }
  &:nth-child(2) {
    animation-delay: 1s;
    background: var(--color-error);
  }
  &:nth-child(3) {
    animation-delay: 2s;
    background: var(--color-primary);
  }
  &:nth-child(4) {
    animation-delay: 3s;
    background: var(--color-secondary-light);
  }
`;

const Circle = styled<{ size: string; inline?: boolean }, 'div'>('div')`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  width: ${props => props.size};
  height: ${props => props.size};
  transition: 0.25s ease width, 0.25s ease height;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

export const InlineLoader: FC<{ size?: string; inline?: boolean }> = ({
  size = '64px',
  inline,
}) => {
  return (
    <Circle size={size} inline={inline}>
      <Wave />
      <Wave />
      <Wave />
      <Wave />
    </Circle>
  );
};

export default InlineLoader;
