import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { Day } from 'types/Day';
import { ApolloError } from 'apollo-boost';

export const GetGroceryDayQuery = gql`
  query GroceryDay {
    me {
      group {
        id
        groceryDay
      }
    }
  }
`;

export type GroceryDayQueryResult = {
  me: {
    group?: {
      id: string;
      groceryDay: number;
    };
  };
};

export default (): [
  { name: string; index: number },
  boolean,
  ApolloError,
  QueryHookResult<GroceryDayQueryResult, {}>
] => {
  const result = useQuery<GroceryDayQueryResult>(GetGroceryDayQuery);
  const groceryDayIndex = pathOr(
    null,
    ['me', 'group', 'groceryDay'],
    result.data,
  ) as number;
  return [
    {
      name: groceryDayIndex !== null ? Day[groceryDayIndex] : 'None',
      index: groceryDayIndex,
    },
    result.loading,
    result.error,
    result,
  ];
};
