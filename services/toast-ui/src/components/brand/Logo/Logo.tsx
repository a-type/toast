import React, { SFC, HTMLAttributes } from 'react';
import BackdropArt from '../BackdropArt';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

export type LogoProps = {
  pattern?: boolean;
  size?: string;
  variant?: 'default' | 'small';
  borderColor?: string;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = makeStyles<Theme, LogoProps>(theme => ({
  wrapper: props => ({
    width: props.size,
    height: props.size,
    fontSize:
      props.variant === 'small'
        ? `calc(${props.size} / 1.8)`
        : `calc(${props.size} / 3)`,
    borderRadius: `calc(${props.size} / 5)`,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',

    borderWidth: props.variant === 'small' ? '2px' : '6px',
    borderStyle: 'solid',
    borderColor: props.borderColor || theme.palette.primary[900],

    '& > *': {
      margin: 'auto',
    },
  }),
  text: {
    margin: 'auto 0',
    padding: 0,
    fontFamily: '"Pacifico", "Roboto", script, sans-serif',
    fontSize: 'inherit',
    fontWeight: 500,
    color: theme.palette.common.white,
    lineHeight: 1,
    position: 'relative',
    zIndex: 1,
  },
}));

const Logo: SFC<LogoProps> = ({
  pattern = true,
  size = '80px',
  variant = 'default',
  borderColor,
  ...rest
}) => {
  const classes = useStyles({ size, variant, borderColor });

  return (
    <div {...rest} className={clsx(classes.wrapper, rest.className)}>
      {pattern && <BackdropArt />}
      <h1 className={classes.text} aria-label="Toast">
        {variant === 'default' ? 'Toast' : 'T'}
      </h1>
    </div>
  );
};

export default Logo;
