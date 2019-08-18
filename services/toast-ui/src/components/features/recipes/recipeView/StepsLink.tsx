import * as React from 'react';
import Link, { LinkProps } from 'components/generic/Link';
import { Button } from '@material-ui/core';

export interface StepsLinkProps extends LinkProps {
  recipeId: string;
}

export const RecipeStepsLink: React.SFC<StepsLinkProps> = ({ recipeId }) => {
  return (
    <Link to={`/recipes/${recipeId}/steps`}>
      <Button>Start cooking</Button>
    </Link>
  );
};