import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LandingPage } from './LandingPage';
import { RecipePage } from './RecipePage';
import { LoginPage } from './LoginPage';
import { SettingsPage } from './SettingsPage';
import { HomePage } from './HomePage';
import { JoinGroupPage } from './JoinGroupPage';
import { ManagePage } from './ManagePage';
import { ShoppingPage } from './ShoppingPage';
import { UsersPage } from './UsersPage';

export const Pages = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/joinGroup" exact component={JoinGroupPage} />
    <PrivateRoute path="/home" component={HomePage} />
    <Route path="/recipes" component={RecipePage} />
    <PrivateRoute path="/shopping" component={ShoppingPage} />
    <PrivateRoute path="/settings" component={SettingsPage} />
    <Route path="/users" component={UsersPage} />
    <PrivateRoute path="/manage" component={ManagePage} />
    <Route render={() => <div>Not found</div>} />
  </Switch>
);
