import React, { FC } from 'react';
import useMedia from 'hooks/useMedia';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav/BottomNav';

export interface NavigationProps {
  gridArea: string;
}

export const Navigation: FC<NavigationProps> = props => {
  const isWide = useMedia(`(min-width: ${NAV_SIDEBAR_MIN_WIDTH_PX}px)`);

  if (isWide) {
    return <Sidebar {...props} />;
  } else {
    return <BottomNav {...props} />;
  }
};

export default Navigation;
