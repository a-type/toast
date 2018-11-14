import * as React from 'react';
import styled from 'styled-components';

const Path = styled<{ color: string; scale: number }, 'path'>('path')`
  fill: var(${props => `--color-${props.color}`});
  transform: scale(${props => props.scale});
  transform-origin: 50% 100%;
`;

export interface WaveProps {
  scale?: number;
  color?: string;
  factor?: number;
}

const Wave: React.SFC<WaveProps> = ({ scale, color, factor }) => {
  const startPosition = [0, 6];
  const startCurveControlPoint = [4, 4 + 0.3 * factor];
  const centerPoint = [6, 7 - 0.2 * factor];
  const endPoint = [10, 8 + 0.5 * factor];
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

  return (
    <React.Fragment>
      <Path d={d.join(' ')} color={color} scale={scale} />
    </React.Fragment>
  );
};

Wave.defaultProps = {
  scale: 1,
  color: 'brand',
};

export default Wave;
