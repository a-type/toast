import * as React from 'react';
import { Query, QueryResult, QueryOpts } from 'react-apollo';
import gql from 'graphql-tag';
import { GetShoppingList } from 'generated/schema';
import { shoppingList } from './fragments';

export const Document = gql`
  query GetShoppingList {
    group {
      id
      groceryDay
      shoppingList {
        ...ShoppingListView
      }
    }
  }

  ${shoppingList}
`;

interface GetShoppingListQueryProps {
  variables?: GetShoppingList.Variables;
  skip?: boolean;
  options?: QueryOpts;
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
