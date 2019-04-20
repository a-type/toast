import React, {
  SFC,
  useState,
  useContext,
  Fragment,
  HTMLAttributes,
} from 'react';
import HeaderBar from './HeaderBar';
import { Box, Layer, BoxProps, Button } from 'grommet';
import useMedia from 'hooks/useMedia';
import { Link, Icon } from 'components/generic';
import { Logo, BackdropArt } from 'components/brand';
import SidebarLink from './SidebarLink';
import AuthContext from 'contexts/AuthContext';
import Avatar from './Avatar';
import { path } from 'ramda';
import styled from 'styled-components';
import browserHistory from 'browserHistory';
import firebase from 'services/firebase';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';
import ToggleButton from './ToggleButton';
import SidebarContact from './Contact';
import SidebarGestureContainer from './GestureContainer';
import { IsAdmin } from 'features/auth/gates';

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
  const isWide = useMedia(`(min-width: ${NAV_SIDEBAR_MIN_WIDTH_PX}px)`);
  const [open, setOpen] = useState<boolean>(false);
  const hideSidebar = () => {
    // if this isn't delayed, the navigation never happens... unsure why
    setTimeout(() => setOpen(false), 0);
  };
  const { user, isLoggedIn } = useContext(AuthContext);

  const anonContent = (
    <>
      <SidebarLink
        nav
        label="Join or log in"
        icon="local_dining"
        to="/login"
        onMouseUp={hideSidebar}
      />
    </>
  );

  const authContent = (
    <Fragment>
      <Avatar avatarUrl={path(['photoURL'], user)} />

      <SidebarLink
        nav
        exact
        label="Home"
        icon="home"
        to="/"
        onMouseUp={hideSidebar}
      />

      <SidebarLink
        nav
        exact
        label="Plan"
        icon="calendar_today"
        to="/plan"
        onMouseUp={hideSidebar}
      />
      <SidebarLink
        nav
        exact
        label="Find recipes"
        icon="search"
        to="/recipes/find"
        onMouseUp={hideSidebar}
      />
      <SidebarLink
        nav
        label="Your recipes"
        icon="bookmarks"
        to="/recipes/collection"
        onMouseDown={hideSidebar}
      />
      <SidebarLink
        nav
        label="Shopping list"
        icon="list"
        to="/shoppingList"
        onMouseUp={hideSidebar}
      />

      <SidebarLink
        nav
        label="Settings"
        icon="settings"
        to="/settings"
        onMouseUp={hideSidebar}
      />

      <IsAdmin>
        <SidebarLink
          nav
          label="Manage"
          icon="warning"
          to="/manage"
          onMouseUp={hideSidebar}
        />
      </IsAdmin>

      <Box align="center" pad="medium">
        <Button
          label="Log out"
          icon={<Icon name="meeting_room" />}
          onClick={async () => {
            await firebase.auth().signOut();
            browserHistory.push('/');
          }}
        />
      </Box>
    </Fragment>
  );

  const content = (
    <SidebarContentBox
      gridArea={isWide ? gridArea : null}
      height="100%"
      embedded={isWide}
      className="sidebar overlay-context"
    >
      <BackdropArt />
      {!isWide && <ToggleButton open onClick={() => setOpen(false)} />}
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

  if (isWide) {
    return content;
  }

  return (
    <React.Fragment>
      <SidebarGestureContainer open={open} setOpen={setOpen}>
        {content}
      </SidebarGestureContainer>
      <HeaderBar
        open={open}
        onClick={() => setOpen(!open)}
        gridArea={isWide ? null : gridArea}
      />
    </React.Fragment>
  );
};

export default Sidebar;
