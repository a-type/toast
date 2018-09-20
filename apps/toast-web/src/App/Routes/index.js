import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipePage from './pages/Recipe';
import UserPage from './pages/User';
import IngredientPage from './pages/Ingredient';
import EditRecipePage from './pages/EditRecipe';
import LinkRecipePage from './pages/LinkRecipe';
import SearchPage from './pages/Search';
import ScannerPage from './pages/Scanner';
import LoggedInPage from './pages/LoggedIn';
import ManagePage from './pages/Manage';
import NotFoundPage from './pages/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/loggedIn" component={LoggedInPage} />
    <Route path="/recipes/create" component={EditRecipePage} />
    <Route path="/recipes/link" component={LinkRecipePage} />
    <Route exact path="/recipes/:recipeId/edit" component={EditRecipePage} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
    <Route path="/users/:userId" component={UserPage} />
    <Route path="/ingredients/:ingredientId" component={IngredientPage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/scanner" component={ScannerPage} />
    <Route path="/manage" component={ManagePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
