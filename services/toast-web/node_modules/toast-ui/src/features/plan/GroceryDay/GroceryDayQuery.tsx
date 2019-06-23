import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';

export type GroceryDayVariables = {};
export type GroceryDayQuery = {
  me: {
    id: string;
    group?: {
      id: string;
      groceryDay: number;
    };
  };
};

export const Document = gql`
  query GroceryDay {
    me {
      id
      group {
        id
        groceryDay
      }
    }
  }
`;

interface GroceryDayQueryProps {
  variables?: GroceryDayVariables;
  skip?: boolean;
  children(
    result: QueryResult<GroceryDayQuery, GroceryDayVariables>,
  ): React.ReactNode;
}

const GroceryDayQuery: React.SFC<GroceryDayQueryProps> = props => (
  <Query<GroceryDayQuery, GroceryDayVariables> query={Document} {...props} />
);

export default GroceryDayQuery;
