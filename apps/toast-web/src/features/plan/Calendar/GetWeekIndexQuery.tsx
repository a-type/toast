import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GetWeekIndex } from 'generated/schema';

export const Document = gql`
  query GetWeekIndex($year: Int!, $month: Int!, $date: Int!) {
    planWeekIndex(year: $year, month: $month, date: $date)
    scheduleStartWeekDate
  }
`;

interface GetWeekIndexQueryProps {
  variables?: GetWeekIndex.Variables;
  skip?: boolean;
  children(
    result: QueryResult<GetWeekIndex.Query, GetWeekIndex.Variables>,
  ): React.ReactNode;
}

const today = new Date();

const GetWeekIndexQuery: React.SFC<GetWeekIndexQueryProps> = props => (
  <Query<GetWeekIndex.Query, GetWeekIndex.Variables>
    query={Document}
    variables={{
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
      ...props.variables,
    }}
    {...props}
  />
);

export default GetWeekIndexQuery;
