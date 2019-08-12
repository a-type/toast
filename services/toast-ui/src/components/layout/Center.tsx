import React, { FC, ReactNode, ComponentClass } from 'react';
import {
  Paper,
  Box,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';

export type CenterProps = {
  title?: string;
  Icon?: ComponentClass<any> | FC<any>;
};

const useStyles = makeStyles(theme => ({
  container: {},
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(16),
    padding: theme.spacing(3),
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(3) + 60,
    maxWidth: '700px',
  },
  title: {},
  icon: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    padding: '20px',
    borderRadius: '120px',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    boxShadow: theme.shadows[2],
  },
}));

export const Center: FC<CenterProps> = ({ title, Icon, children }) => {
  const classes = useStyles({ title, Icon, children });

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        {Icon && <Icon className={classes.icon} />}
        {title && (
          <Typography variant="h2" className={classes.title} gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </Paper>
    </Container>
  );
};
