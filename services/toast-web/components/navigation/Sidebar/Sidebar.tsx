import React, { SFC, useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import SidebarContact from './Contact';
import { IsAdmin } from '../../auth/IsAdmin';
import {
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Theme,
} from '@material-ui/core';
import {
  LocalDiningTwoTone,
  CalendarTodayTwoTone,
  BookmarksTwoTone,
  SettingsTwoTone,
  WarningTwoTone,
  ShoppingCartTwoTone,
  MeetingRoomTwoTone,
  PersonTwoTone,
  HomeTwoTone,
} from '@material-ui/icons';
import firebase from '../../../lib/firebase';
import { makeStyles } from '@material-ui/styles';
import ListItemLink from './SidebarLink';
import Logo from '../../brand/Logo';
import Link from '../../Link';
import { useRouter } from 'next/router';

interface SidebarProps {}

const useStyles = makeStyles<Theme, SidebarProps>(theme => ({
  drawer: props => ({
    width: '240px',
    flexShrink: 0,
    position: 'relative',
    height: '100%',
  }),
  drawerPaper: {
    position: 'relative',
    backgroundColor: theme.palette.primary[500],
    transition: theme.transitions.create('background-color'),
  },
  listItemLink: {
    '&.link-matching': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary[900],

      // '& svg': {
      //   color: theme.palette.primary.dark,
      // },
    },
  },
}));

const Sidebar: SFC<SidebarProps> = props => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const classes = useStyles(props);

  const logout = async () => {
    await firebase.auth().signOut();
    router.push('/');
  };

  const anonContent = (
    <List>
      <ListItemLink to="/login" nav className={classes.listItemLink}>
        <ListItemIcon>
          <LocalDiningTwoTone />
        </ListItemIcon>
        <ListItemText>Join or log in</ListItemText>
      </ListItemLink>
    </List>
  );

  const authContent = (
    <List>
      <ListItemLink to="/home" nav className={classes.listItemLink}>
        <ListItemIcon>
          <HomeTwoTone />
        </ListItemIcon>
        <ListItemText>Home</ListItemText>
      </ListItemLink>
      <ListItemLink to="/plan" nav className={classes.listItemLink}>
        <ListItemIcon>
          <CalendarTodayTwoTone />
        </ListItemIcon>
        <ListItemText>Plan</ListItemText>
      </ListItemLink>
      <ListItemLink to="/shopping" nav className={classes.listItemLink}>
        <ListItemIcon>
          <ShoppingCartTwoTone />
        </ListItemIcon>
        <ListItemText>Shopping</ListItemText>
      </ListItemLink>
      <ListItemLink to="/recipes" nav className={classes.listItemLink}>
        <ListItemIcon>
          <BookmarksTwoTone />
        </ListItemIcon>
        <ListItemText>Recipes</ListItemText>
      </ListItemLink>
      {user && (
        <ListItemLink
          to={`/users/${user.uid}`}
          nav
          className={classes.listItemLink}
        >
          <ListItemIcon>
            <PersonTwoTone />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItemLink>
      )}
      <ListItemLink to="/settings" nav className={classes.listItemLink}>
        <ListItemIcon>
          <SettingsTwoTone />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </ListItemLink>
      <IsAdmin>
        <ListItemLink to="/manage" nav className={classes.listItemLink}>
          <ListItemIcon>
            <WarningTwoTone />
          </ListItemIcon>
          <ListItemText>Manage</ListItemText>
        </ListItemLink>
      </IsAdmin>
      <ListItemLink
        onClick={logout}
        component="button"
        className={classes.listItemLink}
      >
        <ListItemIcon>
          <MeetingRoomTwoTone />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </ListItemLink>
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Box p={3} alignItems="center" display="flex" flexDirection="column">
        <Link to="/">
          <Logo size="100px" />
        </Link>
      </Box>
      <Divider />
      {isLoggedIn ? authContent : anonContent}
      <Divider />
      <SidebarContact />
    </Drawer>
  );
};

export default Sidebar;
