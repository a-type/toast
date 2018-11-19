import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GetShoppingList } from 'generated/schema';
import { shoppingList } from './fragments';

export const Document = gql`
  query GetShoppingList($startDate: Date, $endDate: Date) {
    plan {
      id
      shoppingList(startDate: $startDate, endDate: $endDate) {
        ...ShoppingListView
      }
    }
  }

  ${shoppingList}
`;

interface GetShoppingListQueryProps {
  variables?: GetShoppingList.Variables;
  skip?: boolean;
  children(
    result: QueryResult<GetShoppingList.Query, GetShoppingList.Variables>,
  ): React.ReactNode;
}

const GetShoppingListQuery: React.SFC<GetShoppingListQueryProps> = props => (
  <Query<GetShoppingList.Query, GetShoppingList.Variables>
    query={Document}
    {...props}
  />
);

export default GetShoppingListQuery;
