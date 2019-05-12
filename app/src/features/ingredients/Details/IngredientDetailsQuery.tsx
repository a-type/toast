import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';

export type IngredientDetailsVariables = {
  id: string;
};

export type IngredientDetailsQuery = {
  ingredient: {
    id: string;
    name: string;
    description?: string;
    attribution?: string;
    alternateNames: string[];
    recipes: {
      id: string;
      title: string;
      coverImage?: {
        id: string;
        url: string;
        attribution?: string;
      };
    }[];
  };
};

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
  variables?: IngredientDetailsVariables;
  skip?: boolean;
  children(
    result: QueryResult<IngredientDetailsQuery, IngredientDetailsVariables>,
  ): React.ReactNode;
}

const IngredientDetailsQuery: React.SFC<
  IngredientDetailsQueryProps
> = props => (
  <Query<IngredientDetailsQuery, IngredientDetailsVariables>
    query={Document}
    {...props}
  />
);

export default IngredientDetailsQuery;
