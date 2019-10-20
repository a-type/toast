import React, { FC, useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import {
  BottomNavigation,
  BottomNavigationAction,
  Theme,
} from '@material-ui/core';
import {
  FindInPageTwoTone,
  CalendarTodayTwoTone,
  BookmarksTwoTone,
  ShoppingCartTwoTone,
  HomeTwoTone,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import useNavState from '../../../hooks/useNavState';

export interface BottomNavProps {
  gridArea?: string;
}

const useStyles = makeStyles<Theme, BottomNavProps>(theme => ({
  bottomNav: props => ({
    gridArea: props.gridArea,
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  }),
}));

export const BottomNav: FC<BottomNavProps> = props => {
  const { isLoggedIn } = useContext(AuthContext);
  const classes = useStyles(props);
  const paths = [
    {
      path: '/home',
    },
    {
      path: '/plan',
    },
    {
      path: '/shopping',
    },
    {
      path: '/recipes',
    },
  ];
  const { index, onChange } = useNavState(paths);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <BottomNavigation
      showLabels
      value={index}
      onChange={onChange}
      className={classes.bottomNav}
    >
      <BottomNavigationAction icon={<HomeTwoTone />} label="Home" />
      <BottomNavigationAction icon={<CalendarTodayTwoTone />} label="Plan" />
      <BottomNavigationAction icon={<ShoppingCartTwoTone />} label="Shopping" />
      <BottomNavigationAction icon={<BookmarksTwoTone />} label="Recipes" />
    </BottomNavigation>
  );
};

export default BottomNav;
