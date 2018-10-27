import React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import { pathOr } from 'ramda';
import { differenceInDays, addDays } from 'date-fns';
import WeekView from './WeekView';
import { AnonLanding } from './components';
import { Content } from 'components/layouts';
import GetWeekIndexQuery from './GetWeekIndexQuery';

const AutoWeekSelectorView = ({ weekIndex, dayIndex }) => {
  if (weekIndex !== undefined)
    return (
      <Content>
        <WeekView weekIndex={weekIndex} dayIndex={dayIndex} />
      </Content>
    );

  const today = new Date();

  return (
    <Content>
      <GetWeekIndexQuery
        variables={{
          year: today.getFullYear(),
          month: today.getMonth(),
          date: today.getDate(),
        }}
      >
        {({ data, loading, error }) => {
          if (loading || error) {
            return <WeekView.Skeleton weekIndex={weekIndex} dayIndex={0} />;
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

          return (
            <WeekView weekIndex={data.planWeekIndex} dayIndex={dayIndex} />
          );
        }}
      </GetWeekIndexQuery>
    </Content>
  );
};

export default props => (
  <IsLoggedIn fallback={<AnonLanding />}>
    <AutoWeekSelectorView {...props} />
  </IsLoggedIn>
);
