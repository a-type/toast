import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface WaveProps {
  scale?: number;
  color?: string;
  factor?: number;
  offset?: number;
}

const factorOffset = factor => (Math.random() - 0.5) * factor;

const useStyles = makeStyles<Theme, WaveProps>(theme => ({
  root: props => ({
    fill: props.color,
    transform: `scale(${props.scale})`,
    transformOrigin: '50% 50%',
    transition: '0.2s ease all',
  }),
}));

const Wave: React.SFC<WaveProps> = ({ scale, color, factor, offset }) => {
  const classes = useStyles({ scale, color, factor, offset });

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

  return (
    <path
      d={d.join(' ')}
      color={color}
      scale={scale}
      className={classes.root}
    />
  );
};

Wave.defaultProps = {
  scale: 1,
  color: '#f6c667',
};

export default Wave;
