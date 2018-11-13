import React from 'react';
import Layout from './Layout';
import Logo from 'components/brand/Logo';
import { Link } from 'components/generic';
import ProfileButton from './ProfileButton';
import { Button } from 'components/generic';
import PlanButton from './PlanButton';
import ShoppingListButton from './ShoppingListButton';
import Controls from './Controls';

const NavBar = () => {
  return (
    <Layout>
      <Link nav to="/" data-grid-area="logo">
        <Logo />
      </Link>
      <Controls data-grid-area="controls">
        <Link nav to="/search" tabIndex={-1}>
          <Button.Icon name="search" />
        </Link>
        <PlanButton />
        <ShoppingListButton />
        <ProfileButton />
      </Controls>
    </Layout>
  );
};

export default NavBar;
