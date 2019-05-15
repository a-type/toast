import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/Home';
import PlanPage from './pages/Plan';
import RecipePage from './pages/Recipe';
import UserPage from './pages/User';
import IngredientPage from './pages/Ingredient';
import ManagePage from './pages/Manage';
import NotFoundPage from './pages/NotFound';
import ShoppingList from './pages/ShoppingList';
import LoginPage from './pages/Login';
import JoinGroupPage from './pages/JoinGroup';
import Explore from './pages/Explore';
import SettingsPage from './pages/Settings';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />

    <PrivateRoute path="/plan" component={PlanPage} />
    <PrivateRoute path="/shoppingList" component={ShoppingList} />
    <PrivateRoute path="/joinGroup" exact component={JoinGroupPage} />

    <PrivateRoute path="/explore" component={Explore} />

    <Route path="/recipes" component={RecipePage} />

    <Route path="/users/:userId" component={UserPage} />

    <Route path="/ingredients/:ingredientId" component={IngredientPage} />

    <PrivateRoute path="/settings" component={SettingsPage} />

    <PrivateRoute path="/manage" component={ManagePage} />

    <Route component={NotFoundPage} />
  </Switch>
);
