import * as React from 'react';
import styled from 'styled-components';

const Path = styled<{ color: string; scale: number }, 'path'>('path')`
  fill: ${props => props.color};
  transform: scale(${props => props.scale});
  transform-origin: 50% 100%;
`;

export interface WaveProps {
  scale?: number;
  color?: string;
  factor?: number;
}

const Y = 4.5;
const X = 4;

const Wave: React.SFC<WaveProps> = ({ scale, color, factor }) => {
  const startPosition = [0, Y + 1];
  const startCurveControlPoint = [X - 2, Y - 1 + 0.3 * factor];
  const centerPoint = [X, Y + 2 - 0.2 * factor];
  const endPoint = [10, Y + 3 + 0.5 * factor];
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
