import React, { FC } from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';

export type RowProps = BoxProps & {
  gap?: string | number;
};

const useStyles = makeStyles<Theme, RowProps>(theme => ({
  row: props => ({
    '& > * + *': {
      marginLeft:
        typeof props.gap === 'string' ? props.gap : theme.spacing(props.gap),
    },
  }),
}));

export const Row: FC<RowProps> = props => {
  const classes = useStyles(props);
  return (
    <Box
      display="flex"
      flexDirection="row"
      {...props}
      className={classes.row}
    />
  );
};

Row.defaultProps = {
  gap: 1,
};
