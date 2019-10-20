import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { colors } from 'themes/colors';

const useStyles = makeStyles<Theme, any>(theme => ({
  root: props => ({
    position: 'relative',
    borderRadius: '100%',
    overflow: 'hidden',
    width: props.size,
    height: props.size,
    transition: '0.25s ease width, 0.25s ease height',
    display: props.inline ? 'inline-block' : 'block',
  }),
  wave: {
    animation: '$waveAnimation 4s infinite ease-in-out',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    animationFillMode: 'forwards',
    transform: 'translate(-50%, -50%) scale(0)',

    '&:nth-child(1)': {
      animationDelay: '0',
      background: colors.purple[500],
    },
    '&:nth-child(2)': {
      animationDelay: '1s',
      background: colors.red[500],
    },
    '&:nth-child(3)': {
      animationDelay: '2s',
      background: colors.yellow[500],
    },
    '&:nth-child(4)': {
      animationDelay: '3s',
      background: colors.green[500],
    },
  },
  '@keyframes waveAnimation': {
    '0%': {
      left: '-50%',
      top: '150%',
      zIndex: 10,
      transform: 'translate(-50%, -50%) scale(0.8)',
    },
    '50%': {
      left: '50%',
      top: '50%',
      zIndex: 5,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '100%': {
      left: '50%',
      top: '50%',
      zIndex: 0,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
}));

export const InlineLoader: FC<{ size?: string; inline?: boolean }> = ({
  size = '64px',
  inline,
}) => {
  const classes = useStyles({ size, inline });

  return (
    <div className={classes.root}>
      <div className={classes.wave} />
      <div className={classes.wave} />
      <div className={classes.wave} />
      <div className={classes.wave} />
    </div>
  );
};

export default InlineLoader;
