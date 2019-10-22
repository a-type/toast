import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { Loader } from 'components/Loader';
import { pathOr } from 'ramda';
import { FullRecipe } from 'hooks/features/fragments';
import { RecipeGrid } from './RecipeGrid';
import { useUser } from 'hooks/features/useUser';

export interface AuthoredRecipesProps {
  userId?: string;
}

const useStyles = makeStyles<Theme, AuthoredRecipesProps>(theme => ({}));

export const AuthoredRecipes: FC<AuthoredRecipesProps> = props => {
  const classes = useStyles(props);
  const { userId } = props;

  const { data, loading, error } = useUser({ id: userId });

  if (error) {
    console.error(error);
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  const recipes = (pathOr(
    [],
    ['user', 'authoredRecipes', 'edges'],
    data,
  ) as any[]).map(({ node }) => node) as FullRecipe[];

  return <RecipeGrid recipes={recipes} />;
};
