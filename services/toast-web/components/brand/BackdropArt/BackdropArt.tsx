import React, { FC } from 'react';
import { Wave } from './components';
import { makeStyles } from '@material-ui/core';

const colors = ['#290f34', '#b30753', '#f6c667'];

const useStyles = makeStyles(() => ({
  svg: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
}));

export const BackdropArt: FC<{
  fade?: boolean;
  [propName: string]: any;
}> = ({ fade, ...props }) => {
  const [factor, setFactor] = React.useState(0.5);
  const classes = useStyles({});

  const artContent = (
    <>
      <rect x="0" y="0" width="100%" height="100%" fill="#bff4ed" />
      {colors.map((color, idx) => (
        <Wave
          color={color}
          scale={1 + Math.abs(4 - idx) * (0.2 + 0.3 * factor)}
          offset={idx * (7 / 9)}
          factor={factor}
          key={idx}
        />
      ))}
    </>
  );

  return (
    <svg
      viewBox="0 0 10 10"
      className={classes.svg}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      {artContent}
    </svg>
  );
};

export default BackdropArt;
