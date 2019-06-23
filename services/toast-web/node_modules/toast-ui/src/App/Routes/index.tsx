import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/HomePage';
import RecipePage from './pages/Recipe';
import ManagePage from './pages/Manage';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import JoinGroupPage from './pages/JoinGroup';
import { ExplorePage } from './pages/Explore/Explore';
import SettingsPage from './pages/Settings';
import Collections from './pages/Collections';
import LandingPage from './pages/LandingPage';

export default () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={LoginPage} />

    <PrivateRoute path="/home" component={HomePage} />

    <PrivateRoute path="/joinGroup" exact component={JoinGroupPage} />

    <PrivateRoute path="/explore" component={ExplorePage} />

    <Route path="/recipes" component={RecipePage} />

    <PrivateRoute path="/collections" component={Collections} />

    <PrivateRoute path="/settings" component={SettingsPage} />

    <PrivateRoute path="/manage" component={ManagePage} />

    <Route component={NotFoundPage} />
  </Switch>
);
