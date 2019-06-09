import styled, { css } from 'styled-components';

const size = ({ size = 10 }) => `${size}px`;
const color = ({ color = 'var(--color-primary)' }) => color;

export type TriangleDirection = 'up' | 'down' | 'left' | 'right';

export type TriangleProps = {
  direction?: TriangleDirection;
  size?: number;
  color?: string;
};

const up = css<TriangleProps>`
  border-left: ${size} solid transparent;
  border-right: ${size} solid transparent;

  border-bottom: ${size} solid ${color};
`;

const down = css<TriangleProps>`
  border-left: ${size} solid transparent;
  border-right: ${size} solid transparent;

  border-top: ${size} solid ${color};
`;

const left = css<TriangleProps>`
  border-top: ${size} solid transparent;
  border-bottom: ${size} solid transparent;

  border-right: ${size} solid ${color};
`;

const right = css<TriangleProps>`
  border-top: ${size} solid transparent;
  border-bottom: ${size} solid transparent;

  border-left: ${size} solid ${color};
`;

export const Triangle = styled<TriangleProps, 'div'>('div')`
  width: 0;
  height: 0;

  ${props => {
    switch (props.direction) {
      case 'down':
        return down;
      case 'left':
        return left;
      case 'right':
        return right;
      default:
        return up;
    }
  }}
`;
