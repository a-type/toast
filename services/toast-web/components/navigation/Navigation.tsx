import React, { FC } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav/BottomNav';
import { useMediaQuery, makeStyles } from '@material-ui/core';

export interface NavigationProps {}

const useStyles = makeStyles(theme => ({
  sidebar: {
    height: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  bottomNav: {
    width: '100%',
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Navigation: FC<NavigationProps> = props => {
  const classes = useStyles(props);

  return (
    <>
      <Sidebar className={classes.sidebar} />
      <BottomNav className={classes.bottomNav} />
    </>
  );
};

export default Navigation;
