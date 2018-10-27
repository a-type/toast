import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GetWeekIndex } from 'generated/schema';

export const Document = gql`
  query GetWeekIndex($year: Int!, $month: Int!, $date: Int!) {
    planWeekIndex(year: $year, month: $month, date: $date)
    planStartWeekDate
  }
`;

interface GetWeekIndexQueryProps {
  variables?: GetWeekIndex.Variables;
  skip?: boolean;
  children(
    result: QueryResult<GetWeekIndex.Query, GetWeekIndex.Variables>,
  ): React.ReactNode;
}

const GetWeekIndexQuery: React.SFC<GetWeekIndexQueryProps> = props => (
  <Query<GetWeekIndex.Query, GetWeekIndex.Variables>
    query={Document}
    {...props}
  />
);

export default GetWeekIndexQuery;
