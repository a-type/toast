import React from 'react';
import Logo from 'components/brand/Logo';
import { Link } from 'components/generic';
import ProfileButton from './ProfileButton';
import { Button, Icon } from 'components/generic';
import PlanButton from './PlanButton';
import ShoppingListButton from './ShoppingListButton';
import Controls from './Controls';

const NavBar = () => {
  return (
    <React.Fragment>
      <Link nav to="/" data-grid-area="logo">
        <Logo />
      </Link>
      <Controls data-grid-area="controls">
        <PlanButton />
        <ShoppingListButton />
        <Link nav to="/search" tabIndex={-1}>
          <Button icon={<Icon name="search" />} />
        </Link>
        <ProfileButton />
      </Controls>
    </React.Fragment>
  );
};

export default NavBar;
