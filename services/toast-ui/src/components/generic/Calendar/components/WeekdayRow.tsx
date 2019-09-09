import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface WeekdayRowProps {}

const useStyles = makeStyles<Theme, WeekdayRowProps>(theme => ({
  /* custom styles go here */
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
}));

export const WeekdayRow: FC<WeekdayRowProps> = props => {
  const classes = useStyles(props);
  return <div className={classes.root} />;
};
