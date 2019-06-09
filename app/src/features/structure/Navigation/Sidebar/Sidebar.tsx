import React, { SFC, useContext } from 'react';
import { Logo, BackdropArt } from 'components/brand';
import AuthContext from 'contexts/AuthContext';
import Avatar from './Avatar';
import { path } from 'ramda';
import SidebarContact from './Contact';
import { IsAdmin } from 'features/auth/gates';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Theme,
} from '@material-ui/core';
import Link from 'components/generic/Link';
import {
  LocalDiningTwoTone,
  HomeTwoTone,
  CalendarTodayTwoTone,
  SearchTwoTone,
  BookmarksTwoTone,
  SettingsTwoTone,
  WarningTwoTone,
  MeetingRoomTwoTone,
} from '@material-ui/icons';
import useRouter from 'use-react-router';
import firebase from 'services/firebase';
import { makeStyles } from '@material-ui/styles';

interface SidebarProps {
  gridArea?: string;
}

const useStyles = makeStyles<Theme, SidebarProps>(() => ({
  drawer: props => ({
    gridArea: props.gridArea,
    width: '240px',
    flexShrink: 0,
    position: 'relative',
  }),
  drawerPaper: {
    position: 'relative',
  },
}));

const Sidebar: SFC<SidebarProps> = props => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { history } = useRouter();
  const classes = useStyles(props);

  const navigate = (path: string) => () => history.push(path);
  const logout = async () => {
    await firebase.auth().signOut();
    history.push('/');
  };

  const anonContent = (
    <List>
      <ListItem button onClick={navigate('/login')}>
        <ListItemIcon>
          <LocalDiningTwoTone />
        </ListItemIcon>
        <ListItemText>Join or log in</ListItemText>
      </ListItem>
    </List>
  );

  const authContent = (
    <List>
      <ListItem button onClick={navigate('/home')}>
        <ListItemIcon>
          <CalendarTodayTwoTone />
        </ListItemIcon>
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem button onClick={navigate('/explore')}>
        <ListItemIcon>
          <SearchTwoTone />
        </ListItemIcon>
        <ListItemText>Explore</ListItemText>
      </ListItem>
      <ListItem button onClick={navigate('/collections')}>
        <ListItemIcon>
          <BookmarksTwoTone />
        </ListItemIcon>
        <ListItemText>Collections</ListItemText>
      </ListItem>
      <ListItem button onClick={navigate('/settings')}>
        <ListItemIcon>
          <SettingsTwoTone />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </ListItem>
      <IsAdmin>
        <ListItem button onClick={navigate('/manage')}>
          <ListItemIcon>
            <WarningTwoTone />
          </ListItemIcon>
          <ListItemText>Manage</ListItemText>
        </ListItem>
      </IsAdmin>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <MeetingRoomTwoTone />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </ListItem>
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <BackdropArt />
      <Box p={3} alignItems="center" display="flex" flexDirection="column">
        {user && <Avatar avatarUrl={path(['photoURL'], user)} />}
      </Box>
      <Divider />
      {isLoggedIn ? authContent : anonContent}
      <Divider />
      <SidebarContact />
    </Drawer>
  );
};

export default Sidebar;
