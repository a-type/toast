import React, { SFC, useContext, Fragment, HTMLAttributes } from 'react';
import { Box, BoxProps, Button } from 'grommet';
import { Link, Icon } from 'components/generic';
import { Logo, BackdropArt } from 'components/brand';
import SidebarLink from './SidebarLink';
import AuthContext from 'contexts/AuthContext';
import Avatar from './Avatar';
import { path } from 'ramda';
import styled from 'styled-components';
import browserHistory from 'browserHistory';
import firebase from 'services/firebase';
import SidebarContact from './Contact';
import { IsAdmin } from 'features/auth/gates';
import LogoutButton from 'features/structure/LogoutButton';

const SidebarContentBox = styled<
  { embedded: boolean } & BoxProps & HTMLAttributes<HTMLDivElement>
>(({ embedded, ...props }) => <Box {...props} />)`
  position: relative;
  flex-shrink: 0;
  width: 300px;
  display: flex;
  min-height: 100%;
  flex-direction: column;

  & > .sidebar-content {
    flex: 1;
    overflow-y: auto;
  }

  & > .sidebar-contact {
    flex: 0 0 auto;
  }

  @media (min-width: 800px) {
    width: 300px;
  }
`;

interface SidebarProps {
  gridArea?: string;
}

const Sidebar: SFC<SidebarProps> = ({ gridArea }) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const anonContent = (
    <>
      <SidebarLink nav label="Join or log in" icon="local_dining" to="/login" />
    </>
  );

  const authContent = (
    <Fragment>
      <Avatar avatarUrl={path(['photoURL'], user)} />

      <SidebarLink nav exact label="Home" icon="home" to="/" />
      <SidebarLink nav exact label="Plan" icon="calendar_today" to="/plan" />
      <SidebarLink nav exact label="Find recipes" icon="search" to="/find" />
      <SidebarLink nav label="Collection" icon="bookmarks" to="/recipes" />
      <SidebarLink
        nav
        label="Shopping list"
        icon="shopping_cart"
        to="/shoppingList"
      />

      <SidebarLink nav label="Settings" icon="settings" to="/settings" />

      <IsAdmin>
        <SidebarLink nav label="Manage" icon="warning" to="/manage" />
      </IsAdmin>

      <Box align="center" pad="medium">
        <LogoutButton />
      </Box>
    </Fragment>
  );

  return (
    <SidebarContentBox
      gridArea={gridArea}
      height="100%"
      embedded
      className="sidebar overlay-context"
    >
      <BackdropArt />
      <Box style={{ position: 'relative' }} className="sidebar-content">
        <Box pad="large" align="center">
          <Link nav to="/">
            <Logo />
          </Link>
        </Box>
        {isLoggedIn ? authContent : anonContent}
      </Box>
      <SidebarContact className="sidebar-contact" />
    </SidebarContentBox>
  );
};

export default Sidebar;
