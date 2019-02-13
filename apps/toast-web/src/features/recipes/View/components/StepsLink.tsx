import * as React from 'react';
import { Button } from 'components/generic';
import Link, { LinkProps } from 'components/generic/Link';

export interface StepsLinkProps extends LinkProps {
  recipeId: string;
}

const StepsLink: React.SFC<StepsLinkProps> = ({ recipeId }) => {
  return (
    <Link to={`/recipes/${recipeId}/steps`}>
      <Button label="Start Cooking" primary />
    </Link>
  );
};

export default StepsLink;
