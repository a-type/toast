import React from 'react';
import { DAY_SIZE } from '../constants';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import { ButtonProps } from '@material-ui/core/Button';

export interface DayProps extends ButtonProps {
  faded?: boolean;
  selected?: boolean;
  highlighted?: boolean;
}

const useStyles = makeStyles<Theme, DayProps>(theme => ({
  day: props => ({
    borderRadius: '100%',
    borderColor: props.selected
      ? theme.palette.primary.main
      : props.highlighted
      ? theme.palette.secondary.main
      : theme.palette.grey[100],
    borderWidth: '2px',
    borderStyle: 'solid',
    width: `${DAY_SIZE}px`,
    height: `${DAY_SIZE}px`,
    opacity: props.faded ? 0.5 : 1,
    transition: '0.2s ease all',
    cursor: 'pointer',
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    fontSize: '0.9rem',
    background: props.selected ? theme.palette.primary.main : 'transparent',

    '&:disabled': {
      opacity: 0.5,
      cursor: 'default',
    },
  }),
}));

const Day: FC<DayProps> = props => {
  const classes = useStyles(props);
  return <Button className={classes.day} {...props} />;
};

export default Day;
