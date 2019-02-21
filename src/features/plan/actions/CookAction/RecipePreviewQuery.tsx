import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeCookActionPreview } from 'generated/schema';

export const Document = gql`
  query RecipeCookActionPreview($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      title
      coverImage {
        id
        url
      }
    }
  }
`;

interface RecipeCookActionPreviewQueryProps {
  variables?: RecipeCookActionPreview.Variables;
  skip?: boolean;
  children(
    result: QueryResult<
      RecipeCookActionPreview.Query,
      RecipeCookActionPreview.Variables
    >,
  ): React.ReactNode;
}

const RecipeCookActionPreviewQuery: React.SFC<
  RecipeCookActionPreviewQueryProps
> = props => (
  <Query<RecipeCookActionPreview.Query, RecipeCookActionPreview.Variables>
    query={Document}
    {...props}
  />
);

export default RecipeCookActionPreviewQuery;
