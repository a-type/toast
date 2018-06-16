import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RecipePage from './pages/Recipe';
import AuthorPage from './pages/Author';
import IngredientPage from './pages/Ingredient';
import EditRecipePage from './pages/EditRecipe';
import SearchPage from './pages/Search';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/recipes/edit/create" component={EditRecipePage} />
    <Route path="/recipes/edit/:recipeId" component={EditRecipePage} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
    <Route path="/authors/:authorId" component={AuthorPage} />
    <Route path="/ingredients/:ingredientName" component={IngredientPage} />
    <Route path="/search" component={SearchPage} />
  </Switch>
);
