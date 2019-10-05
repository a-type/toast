import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import MuiFab, { FabProps as MuiFabProps } from '@material-ui/core/Fab';
import clsx from 'clsx';

export interface FabProps extends MuiFabProps {
  component?: any;
  to?: string;
  target?: string;
  rel?: string;
}

const useStyles = makeStyles<Theme, FabProps>(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2) + 55,
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(2),
    },
    zIndex: theme.zIndex.modal - 1,
  },
}));

export const Fab: FC<FabProps> = props => {
  const classes = useStyles(props);

  return (
    <MuiFab
      color="secondary"
      {...props}
      className={clsx(classes.fab, props.className)}
    />
  );
};
