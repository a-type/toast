import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useAuthoredRecipes } from 'hooks/features/useAuthoredRecipes';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader';
import { path } from 'ramda';
import { FullRecipe } from 'hooks/features/fragments';
import { RecipeGrid } from './RecipeGrid';

export interface AuthoredRecipesProps {}

const useStyles = makeStyles<Theme, AuthoredRecipesProps>(theme => ({}));

export const AuthoredRecipes: FC<AuthoredRecipesProps> = props => {
  const classes = useStyles(props);
  const {} = props;

  const { data, loading, error } = useAuthoredRecipes();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  const recipes = (path(
    ['viewer', 'authoredRecipes', 'edges'],
    data,
  ) as any[]).map(({ node }) => node) as FullRecipe[];

  return <RecipeGrid recipes={recipes} />;
};
