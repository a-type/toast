import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/Home';
import PlanPage from './pages/Plan';
import RecipePage from './pages/Recipe';
import UserPage from './pages/User';
import IngredientPage from './pages/Ingredient';
import EditRecipePage from './pages/EditRecipe';
import LinkRecipePage from './pages/LinkRecipe';
import SearchPage from './pages/Search';
import ScannerPage from './pages/Scanner';
import ManagePage from './pages/Manage';
import NotFoundPage from './pages/NotFound';
import ShoppingList from './pages/ShoppingList';
import LoginPage from './pages/Login';
import JoinGroupPage from './pages/JoinGroup';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />

    <PrivateRoute path="/plan" component={PlanPage} />
    <PrivateRoute path="/shoppingList" component={ShoppingList} />
    <PrivateRoute path="/joinGroup" exact component={JoinGroupPage} />

    <PrivateRoute path="/recipes/create" component={EditRecipePage} />
    <PrivateRoute path="/recipes/link" component={LinkRecipePage} />
    <PrivateRoute
      exact
      path="/recipes/:recipeId/edit"
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId" component={RecipePage} />

    <Route path="/users/:userId" component={UserPage} />

    <Route path="/ingredients/:ingredientId" component={IngredientPage} />

    <Route path="/search" component={SearchPage} />

    <Route path="/scanner" component={ScannerPage} />

    <PrivateRoute path="/manage" component={ManagePage} />

    <Route component={NotFoundPage} />
  </Switch>
);
