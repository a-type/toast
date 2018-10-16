import React from 'react';
import { Query } from 'react-apollo';
import gql from 'fraql';
import { IsLoggedIn } from 'features/auth/gates';
import { pathOr } from 'ramda';
import { differenceInDays, addDays } from 'date-fns';
import WeekView from './WeekView';

const GetWeekIndex = gql`
  query GetWeekIndex($year: Int!, $month: Int!, $date: Int!) {
    planWeekIndex(year: $year, month: $month, date: $date)
    planStartWeekDate
  }
`;

const AutoWeekSelectorView = ({ weekIndex, dayIndex }) => {
  if (weekIndex !== undefined)
    return <WeekView weekIndex={weekIndex} dayIndex={dayIndex} />;

  const today = new Date();

  return (
    <Query
      query={GetWeekIndex}
      variables={{
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }}
    >
      {({ data, loading, error }) => {
        if (loading || error) {
          return (
            <WeekView.Skeleton weekIndex={weekIndex} dayIndex={dayIndex} />
          );
        }

        // figure out what day to focus
        const { planStartWeekDate, planWeekIndex } = data;
        const startDate = addDays(
          new Date(planStartWeekDate),
          planWeekIndex * 7,
        );
        // cap the day at 0 minimum, 6 maximum.
        const dayIndex = Math.max(
          0,
          Math.min(6, differenceInDays(today, startDate)),
        );

        return <WeekView weekIndex={data.planWeekIndex} dayIndex={dayIndex} />;
      }}
    </Query>
  );
};

export default props => (
  <IsLoggedIn fallback={<div>Log in</div>}>
    <AutoWeekSelectorView {...props} />
  </IsLoggedIn>
);
