import { ROW_SPACING, DAY_SIZE } from '../constants';
import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface GridProps {
  rows: number;
}

const useStyles = makeStyles<Theme, GridProps>(theme => ({
  /* custom styles go here */
  root: props => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridAutoRows: 'auto',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    justifyItems: 'center',
    rowGap: `${ROW_SPACING}px`,
    overflow: 'hidden',
    transition: '0.2s ease all',
    height: `${props.rows * DAY_SIZE + (props.rows + 1) * ROW_SPACING}px`,
    paddingTop: `${ROW_SPACING}px`,
    paddingBottom: `${ROW_SPACING}px`,

    [theme.breakpoints.up('md')]: {
      alignContent: 'space-around',
    },
  }),
}));

export const Grid: FC<GridProps> = props => {
  const classes = useStyles(props);
  return <div className={classes.root} />;
};
