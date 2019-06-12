import * as React from 'react';
import styled from 'styled-components';

const Path = styled<{ color: string; scale: number }, 'path'>('path')`
  fill: ${props => props.color};
  transform: scale(${props => props.scale});
  transform-origin: 50% 50%;
  transition: 0.2s ease all;
`;

export interface WaveProps {
  scale?: number;
  color?: string;
  factor?: number;
  offset?: number;
}

// focal point
const Y = 4.5;
const X = 5;

const factorOffset = factor => (Math.random() - 0.5) * factor;

const Wave: React.SFC<WaveProps> = ({ scale, color, factor, offset }) => {
  const startPosition = [0, 0 + offset];
  const startCurveControlPoint = [
    2 + factorOffset(factor),
    7 + offset + factorOffset(factor),
  ];
  const centerPoint = [
    4.5 + factorOffset(factor),
    4 + offset + factorOffset(factor),
  ];
  const endPoint = [10, 10 + offset + factorOffset(factor)];
  const bottomY = 20;

  const d = [`M`];
  d.push(startPosition.join(' '));

  d.push(`Q`);
  d.push(`${startCurveControlPoint.join(' ')}`);
  d.push(`${centerPoint.join(' ')}`);

  d.push(`T`);
  d.push(endPoint.join(' '));

  d.push(`L 10 ${startPosition[1]}`);
  d.push(`L 10 ${bottomY}`);
  d.push(`L 0 ${bottomY}`);

  return <Path d={d.join(' ')} color={color} scale={scale} />;
};

Wave.defaultProps = {
  scale: 1,
  color: '#f6c667',
};

export default Wave;
