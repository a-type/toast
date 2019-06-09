import React, { FC, useContext } from 'react';
import AuthContext from 'contexts/AuthContext';
import {
  BottomNavigation,
  BottomNavigationAction,
  Theme,
} from '@material-ui/core';
import useRouter from 'use-react-router';
import {
  HomeTwoTone,
  SearchTwoTone,
  LocalDiningTwoTone,
  CalendarTodayTwoTone,
  BookmarksTwoTone,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import useNavState from 'hooks/useNavState';

export interface BottomNavProps {
  gridArea?: string;
}

const useStyles = makeStyles<Theme, BottomNavProps>({
  bottomNav: props => ({
    gridArea: props.gridArea,
    borderTop: '1px solid #00000010',
  }),
});

export const BottomNav: FC<BottomNavProps> = props => {
  const { isLoggedIn } = useContext(AuthContext);
  const classes = useStyles(props);
  const paths = !isLoggedIn
    ? [
        {
          path: '/',
          exact: true,
        },
        {
          path: '/login',
          exact: true,
        },
      ]
    : [
        {
          path: '/home',
          exact: true,
        },
        {
          path: '/explore',
        },
        {
          path: '/collections',
        },
      ];
  const { index, onChange } = useNavState(paths);

  if (!isLoggedIn) {
    return (
      <BottomNavigation
        showLabels
        onChange={onChange}
        className={classes.bottomNav}
        value={index}
      >
        <BottomNavigationAction icon={<HomeTwoTone />} label="Home" />
        <BottomNavigationAction
          icon={<LocalDiningTwoTone />}
          label="Join or log in"
        />
      </BottomNavigation>
    );
  }

  return (
    <BottomNavigation
      showLabels
      value={index}
      onChange={onChange}
      className={classes.bottomNav}
    >
      <BottomNavigationAction icon={<CalendarTodayTwoTone />} label="Home" />
      <BottomNavigationAction icon={<SearchTwoTone />} label="Explore" />
      <BottomNavigationAction icon={<BookmarksTwoTone />} label="Collections" />
    </BottomNavigation>
  );
};

export default BottomNav;
