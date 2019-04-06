import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { IngredientDetails } from 'generated/schema';

export const Document = gql`
  query IngredientDetails($id: ID!) {
    ingredient(id: $id) {
      id
      name
      description
      attribution
      alternateNames
      recipes {
        id
        title
        coverImage {
          id
          url
          attribution
        }
      }
    }
  }
`;

interface IngredientDetailsQueryProps {
  variables?: IngredientDetails.Variables;
  skip?: boolean;
  children(
    result: QueryResult<IngredientDetails.Query, IngredientDetails.Variables>,
  ): React.ReactNode;
}

const IngredientDetailsQuery: React.SFC<
  IngredientDetailsQueryProps
> = props => (
  <Query<IngredientDetails.Query, IngredientDetails.Variables>
    query={Document}
    {...props}
  />
);

export default IngredientDetailsQuery;
