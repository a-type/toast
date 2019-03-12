import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GroceryDay } from 'generated/schema';

export const Document = gql`
  query GroceryDay {
    group {
      id
      groceryDay
    }
  }
`;

interface GroceryDayQueryProps {
  variables?: GroceryDay.Variables;
  skip?: boolean;
  children(
    result: QueryResult<GroceryDay.Query, GroceryDay.Variables>,
  ): React.ReactNode;
}

const GroceryDayQuery: React.SFC<GroceryDayQueryProps> = props => (
  <Query<GroceryDay.Query, GroceryDay.Variables> query={Document} {...props} />
);

export default GroceryDayQuery;
