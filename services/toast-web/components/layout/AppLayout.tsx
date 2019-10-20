import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface AppLayoutProps {}

const useStyles = makeStyles<Theme, AppLayoutProps>(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateAreas: "'appBar' 'content' 'nav'",
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
    background: `linear-gradient(180deg, ${theme.palette.grey[100]} 0%, ${theme.palette.background.paper} 50vh)`,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const AppLayoutContent: FC<AppLayoutContentProps> = props => {
  const classes = useContentStyles(props);

  return <div id="contentRoot" className={classes.root} {...props} />;
};

export interface AppLayoutNavigationProps {}

const useNavigationStyles = makeStyles<Theme, AppLayoutNavigationProps>(
  theme => ({
    root: {
      width: '100%',
      gridArea: 'nav',
    },
  }),
);

export const AppLayoutNavigation: FC<AppLayoutNavigationProps> = props => {
  const classes = useNavigationStyles(props);

  return <div id="navRoot" className={classes.root} {...props} />;
};

export interface AppLayoutAppBarProps {}

const useAppBarStyles = makeStyles<Theme, AppLayoutAppBarProps>(() => ({
  root: {
    width: '100%',
    gridArea: 'appBar',
  },
}));

export const AppLayoutAppBar: FC<AppLayoutAppBarProps> = props => {
  const classes = useAppBarStyles(props);

  return <div id="appBarRoot" className={classes.root} {...props} />;
};
