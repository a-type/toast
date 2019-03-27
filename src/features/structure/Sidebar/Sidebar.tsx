import React, { SFC, useState, useContext, Fragment } from 'react';
import ToggleButton from './ToggleButton';
import { Box, Layer, BoxProps } from 'grommet';
import useMedia from 'hooks/useMedia';
import { Link } from 'components/generic';
import { Logo, BackdropArt } from 'components/brand';
import SidebarLink from './SidebarLink';
import AuthContext from 'contexts/AuthContext';
import Avatar from './Avatar';
import { path } from 'ramda';
import { OverlayColorContext } from 'components/graphics';
import { GroceryDay } from 'features/plan';
import Invite from 'features/groups/Invite';
import styled from 'styled-components';
import browserHistory from 'browserHistory';
import firebase from 'firebase';

const SidebarContentBox = styled<{ embedded: boolean } & BoxProps>(
  ({ embedded, ...props }) => <Box {...props} />,
)`
  position: relative;
  flex-shrink: 0;
  width: ${props => (props.embedded ? '300px' : '80vw')};

  @media (min-width: 800px) {
    width: 300px;
  }
`;

interface SidebarProps {}

const Sidebar: SFC<SidebarProps> = ({}) => {
  const isWide = useMedia('(min-width: 1200px)');
  const [open, setOpen] = useState<boolean>(false);
  const hideSidebar = () => {
    // if this isn't delayed, the navigation never happens... unsure why
    setTimeout(() => setOpen(false), 0);
  };
  const { user, isLoggedIn } = useContext(AuthContext);

  const anonContent = (
    <SidebarLink
      nav
      label="Join or log in"
      icon="chef-toque"
      to="/login"
      onMouseUp={hideSidebar}
    />
  );

  const authContent = (
    <Fragment>
      <Avatar avatarUrl={path(['photoURL'], user)} />

      <SidebarLink
        nav
        exact
        label="Plan"
        icon="calendar"
        to="/plan"
        onMouseUp={hideSidebar}
      />
      <SidebarLink
        nav
        label="Shopping list"
        icon="check-list"
        to="/shoppingList"
        onMouseUp={hideSidebar}
      />
      <SidebarLink
        nav
        label="Your recipes"
        icon="list-view"
        to="/recipes/collection"
        onMouseDown={hideSidebar}
      />

      <SidebarLink
        label="Log out"
        icon="login"
        onClick={async () => {
          console.log('logging out');
          await firebase.auth().signOut();
          browserHistory.push('/');
        }}
      />

      <Box align="center" pad="medium">
        <Invite />
        <br />
        <GroceryDay />
      </Box>
    </Fragment>
  );

  const content = (
    <SidebarContentBox height="100%" embedded={isWide}>
      <OverlayColorContext>
        <BackdropArt />
        <Box style={{ position: 'relative' }}>
          <Box pad="large" align="center">
            <Link nav to="/">
              <Logo />
            </Link>
          </Box>
          {isLoggedIn ? authContent : anonContent}
        </Box>
      </OverlayColorContext>
    </SidebarContentBox>
  );

  if (isWide) {
    return content;
  }

  return (
    <React.Fragment>
      {open && (
        <Layer
          responsive={false}
          position="left"
          full="vertical"
          margin={{ right: 'medium' }}
          animate
          onClickOutside={() => {
            setOpen(false);
          }}
        >
          {content}
        </Layer>
      )}
      <ToggleButton
        open={open}
        onClick={() => setOpen(!open)}
        style={{ zIndex: open ? 10000 : 10 }}
      />
    </React.Fragment>
  );
};

export default Sidebar;
