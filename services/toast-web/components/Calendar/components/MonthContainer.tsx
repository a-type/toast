import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface MonthContainerProps {}

const useStyles = makeStyles<Theme, MonthContainerProps>(theme => ({
  /* custom styles go here */
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    '& > *': {
      flex: 1,
      margin: 'auto',
      textAlign: 'center',
    },
  },
}));

export const MonthContainer: FC<MonthContainerProps> = props => {
  const classes = useStyles(props);
  return <div className={classes.root} />;
};
