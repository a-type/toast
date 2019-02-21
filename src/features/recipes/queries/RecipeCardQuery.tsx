import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeCard } from 'generated/schema';
import Card from 'features/recipes/RecipeCards/RecipeCard';

export const Document = gql`
  query RecipeCard($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      ...RecipeCard
    }
  }

  ${Card.fragments.recipe}
`;

interface RecipeCardQueryProps {
  variables?: RecipeCard.Variables;
  skip?: boolean;
  children(
    result: QueryResult<RecipeCard.Query, RecipeCard.Variables>,
  ): React.ReactNode;
}

const RecipeCardQuery: React.SFC<RecipeCardQueryProps> = props => (
  <Query<RecipeCard.Query, RecipeCard.Variables> query={Document} {...props} />
);

export default RecipeCardQuery;
