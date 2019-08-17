import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';
import { Day } from 'types/Day';
import { ApolloError } from 'apollo-boost';
import { QueryResult } from '@apollo/react-common';

export const GetGroceryDayQuery = gql`
  query GroceryDay {
    viewer {
      id
      group {
        id
        groceryDay
      }
    }
  }
`;

export type GroceryDayQueryResult = {
  viewer: {
    id: string;
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
  QueryResult<GroceryDayQueryResult, {}>
] => {
  const result = useQuery<GroceryDayQueryResult>(GetGroceryDayQuery);
  const groceryDayIndex = pathOr(
    null,
    ['viewer', 'group', 'groceryDay'],
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
