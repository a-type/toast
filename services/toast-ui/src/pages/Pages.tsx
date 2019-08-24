import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LandingPage } from './LandingPage';
import { RecipePage } from './RecipePage';
import { LoginPage } from './LoginPage';
import { ExplorePage } from './ExplorePage';
import { SettingsPage } from './SettingsPage';
import { CollectionsPage } from './CollectionsPage';
import { HomePage } from './HomePage';
import { SubscriptionPage } from './SubscriptionPage';
import { JoinGroupPage } from './JoinGroupPage';

export const Pages = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/joinGroup" exact component={JoinGroupPage} />
    <PrivateRoute path="/subscription" component={SubscriptionPage} />
    <PrivateRoute path="/home" component={HomePage} />
    <PrivateRoute path="/explore" component={ExplorePage} />
    <Route path="/recipes" component={RecipePage} />
    <PrivateRoute path="/collections" component={CollectionsPage} />
    <PrivateRoute path="/settings" component={SettingsPage} />
    <Route render={() => <div>Not found</div>} />
  </Switch>
);
