import React, { FC } from 'react';
import IconLink from './IconLink';

export interface BottomNavProps {
  gridArea?: string;
}

export const BottomNav: FC<BottomNavProps> = ({ gridArea }) => {
  return (
    <nav
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        background: 'var(--color-gray-lightest)',
        gridTemplateArea: gridArea,
        boxShadow: '0 -2px 4px 0 var(--color-shadow)',
      }}
    >
      <IconLink to="/" exact icon="home" label="Home" />
      <IconLink to="/plan" icon="calendar_today" label="Plan" />
      <IconLink to="/find" icon="search" label="Find" />
      <IconLink to="/recipes" icon="bookmarks" label="Collection" />
    </nav>
  );
};

export default BottomNav;
