import React, { FC, useContext } from 'react';
import IconLink from './IconLink';
import AuthContext from 'contexts/AuthContext';

export interface BottomNavProps {
  gridArea?: string;
}

export const BottomNav: FC<BottomNavProps> = ({ gridArea }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const anonLinks = (
    <>
      <IconLink to="/" exact icon="home" label="Home" />
      <IconLink to="/login" exact icon="local_dining" label="Join or log in" />
    </>
  );

  const authLinks = (
    <>
      <IconLink to="/" exact icon="home" label="Home" />
      <IconLink to="/plan" icon="calendar_today" label="Plan" />
      <IconLink to="/explore" icon="search" label="Explore" />
      <IconLink to="/recipes" icon="bookmarks" label="Collection" />
    </>
  );

  return (
    <nav
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 'var(--spacing-sm) var(--spacing-lg)',
        background: 'var(--color-gray-lightest)',
        gridTemplateArea: gridArea,
        boxShadow: '0 -2px 4px 0 var(--color-shadow)',
      }}
    >
      {isLoggedIn ? authLinks : anonLinks}
    </nav>
  );
};

export default BottomNav;
