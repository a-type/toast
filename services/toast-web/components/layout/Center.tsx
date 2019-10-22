import React, { FC, ReactNode, ComponentClass } from 'react';
import {
  Paper,
  Box,
  makeStyles,
  Typography,
  Container,
  Theme,
} from '@material-ui/core';

export type CenterProps = {
  title?: string;
  Icon?: ComponentClass<any> | FC<any>;
};

const useStyles = makeStyles<Theme, any>(theme => ({
  container: {},
  box: ({ Icon }) => ({
    margin: 'auto',
    marginTop: theme.spacing(16),
    padding: theme.spacing(3),
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(3) + (Icon ? 60 : 0),
    maxWidth: '700px',
  }),
  title: {},
  icon: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    opacity: 0.6,
    color: theme.palette.grey[500],
  },
}));

export const Center: FC<CenterProps> = ({ title, Icon, children }) => {
  const classes = useStyles({ title, Icon, children });

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        {Icon && <Icon className={classes.icon} />}
        {title && (
          <Typography variant="h2" className={classes.title} gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Container>
  );
};
