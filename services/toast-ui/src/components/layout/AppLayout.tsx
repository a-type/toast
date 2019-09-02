import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface AppLayoutProps {}

const useStyles = makeStyles<Theme, AppLayoutProps>(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateAreas: "'content' 'nav'",
    gridTemplateRows: '1fr auto',
    gridTemplateColumns: '100%',

    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: "'nav content'",
      gridTemplateRows: '1fr',
      gridTemplateColumns: 'auto 1fr',
    },
  },
}));

export const AppLayout: FC<AppLayoutProps> = props => {
  const classes = useStyles(props);
  const {} = props;

  return <div className={classes.root} {...props} />;
};

export interface AppLayoutContentProps {}

const useContentStyles = makeStyles<Theme, AppLayoutContentProps>(theme => ({
  root: {
    width: '100%',
    gridArea: 'content',
    overflowY: 'auto',
  },
}));

export const AppLayoutContent: FC<AppLayoutContentProps> = props => {
  const classes = useContentStyles(props);

  return <div id="contentRoot" className={classes.root} {...props} />;
};
