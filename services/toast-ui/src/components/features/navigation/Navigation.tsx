import React, { FC } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav/BottomNav';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

export interface NavigationProps {
  gridArea: string;
}

export const Navigation: FC<NavigationProps> = props => {
  const theme = useTheme<Theme>();
  const isWide = useMediaQuery(theme.breakpoints.up('md'));

  if (isWide) {
    return <Sidebar {...props} />;
  } else {
    return <BottomNav {...props} />;
  }
};

export default Navigation;
