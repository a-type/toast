import * as React from 'react';
import { makeStyles, Theme, ButtonBase } from '@material-ui/core';
import { ExpandMoreTwoTone } from '@material-ui/icons';

const useStyles = makeStyles<Theme, { expanded?: boolean }>(theme => ({
  button: {
    background: theme.palette.common.white,
    width: '100%',
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    borderRadius: `0 0 8px 8px`,
    marginBottom: theme.spacing(3),
    border: `2px solid transparent`,
    borderTop: 0,
    cursor: 'pointer',
    transition: '0.2s ease all',
  },
  icon: props => ({
    transform: `rotate(${props.expanded ? '180deg' : '0deg'})`,
  }),
}));

const ExpandButton = props => {
  const classes = useStyles(props);

  return (
    <ButtonBase {...props} className={classes.button}>
      <ExpandMoreTwoTone className={classes.icon} />
    </ButtonBase>
  );
};

export default ExpandButton;
