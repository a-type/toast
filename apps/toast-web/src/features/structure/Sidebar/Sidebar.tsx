import React, { SFC, useState, useContext, Fragment } from 'react';
import ToggleButton from './ToggleButton';
import { Box, Layer, Button } from 'grommet';
import useMedia from 'hooks/useMedia';
import { Link } from 'components/generic';
import { Logo, BackdropArt } from 'components/brand';
import { IsLoggedIn } from 'features/auth/gates';
import SidebarLink from './SidebarLink';
import AuthContext from 'contexts/AuthContext';
import Avatar from './Avatar';
import { path } from 'ramda';
import { OverlayColorContext } from 'components/graphics';
import { GroceryDayBanner } from 'features/plan';
import Invite from 'features/groups/Invite';

interface SidebarProps {}

const Sidebar: SFC<SidebarProps> = ({}) => {
  const isWide = useMedia('(min-width: 1200px)');
  const [open, setOpen] = useState<boolean>(false);
  const { user, isLoggedIn } = useContext(AuthContext);

  const anonContent = (
    <SidebarLink nav label="Log in or sign up" icon="chef-toque" to="/login" />
  );

  const authContent = (
    <Fragment>
      <Avatar avatarUrl={path(['photoURL'], user)} />

      <SidebarLink nav label="Plan" icon="calendar" to="/plan" />
      <SidebarLink
        nav
        label="Shopping List"
        icon="check-list"
        to="/shoppingList"
      />

      <Box margin={{ top: 'auto' }} pad="medium">
        <GroceryDayBanner />
      </Box>

      <SidebarLink nav label="Edit your plan" icon="edit" to="/plan/edit" />

      <Box align="center" pad="medium">
        <Invite />
      </Box>
    </Fragment>
  );

  const content = (
    <Box
      basis="auto"
      height="100%"
      style={{
        position: 'relative',
        flexShrink: 0,
        width: isWide ? '300px' : '80vw',
      }}
    >
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
    </Box>
  );

  if (isWide) {
    return content;
  }

  return (
    <React.Fragment>
      {open && (
        <Layer
          position="left"
          full="vertical"
          margin={{ right: 'medium' }}
          animate
          onClickOutside={() => setOpen(false)}
        >
          {content}
        </Layer>
      )}
      <ToggleButton open={open} onClick={() => setOpen(!open)} />
    </React.Fragment>
  );
};

export default Sidebar;