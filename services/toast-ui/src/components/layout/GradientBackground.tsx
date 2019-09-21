import React, { FC, HTMLAttributes } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

export interface GradientBackgroundProps
  extends HTMLAttributes<HTMLDivElement> {}

const useStyles = makeStyles<Theme, GradientBackgroundProps>(theme => ({
  root: {
    width: '100%',
    background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50vh)`,
  },
}));

export const GradientBackground: FC<GradientBackgroundProps> = props => {
  const classes = useStyles(props);

  return <div {...props} className={clsx(classes.root, props.className)} />;
};
