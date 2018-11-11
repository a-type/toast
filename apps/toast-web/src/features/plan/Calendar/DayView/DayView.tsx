import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanDay } from 'generated/schema';
import { Content, Controls } from 'components/layouts';
import { Button, Link, Disconnected, Icon, Loader } from 'components/generic';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import CalendarPlanQuery from '../CalendarPlanQuery';
import logger from 'logger';
import { Redirect } from 'react-router';
import Meals from './Meals';
import GetWeekIndexQuery from '../GetWeekIndexQuery';
import { addDays, differenceInDays } from 'date-fns';

interface CalendarDayViewProps {
  weekIndex?: number;
  dayIndex?: number;
}

const today = new Date();
const getDayIndex = (planStartWeekDate: number, planWeekIndex: number) => {
  const startDate = addDays(new Date(planStartWeekDate), planWeekIndex * 7);
  return Math.max(0, Math.min(6, differenceInDays(today, startDate)));
};

const CalendarDayView: React.SFC<CalendarDayViewProps> = ({
  weekIndex: providedWeekIndex,
  dayIndex: providedDayIndex,
}) => (
  <GetWeekIndexQuery
    skip={!!providedWeekIndex}
    variables={{
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
    }}
  >
    {({
      data: { planWeekIndex, planStartWeekDate },
      loading: weekIndexLoading,
      error: weekIndexError,
    }) => {
      if (weekIndexLoading) {
        return <Loader size={90} />;
      }

      if (weekIndexError) {
        logger.fatal(weekIndexError);
        return <Disconnected />;
      }

      const weekIndex = providedWeekIndex || planWeekIndex;
      const dayIndex =
        providedDayIndex || getDayIndex(planStartWeekDate, planWeekIndex);

      return (
        <Content>
          <CalendarPlanQuery variables={{ weekIndex }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <H1.Skeleton />;
              }

              if (error) {
                logger.fatal(error);
                return <Disconnected />;
              }

              if (!data || !data.week) {
                return <Redirect to="/plan/edit" />;
              }

              const day = pathOr(
                null,
                ['week', 'days', dayIndex],
                data,
              ) as PlanDay;

              return (
                <React.Fragment>
                  <Controls>
                    <Link to={`/plan/calendar/${weekIndex}`}>
                      <Button spaceBelow="lg">
                        <Icon name="calendar" /> Calendar view
                      </Button>
                    </Link>
                  </Controls>
                  <H1>{formatDay(day.date)}</H1>
                  <Meals
                    meals={day.meals}
                    weekIndex={weekIndex}
                    dayIndex={dayIndex}
                  />
                  <Controls>
                    <Link
                      to={`/plan/${weekIndex - (dayIndex === 0 ? 1 : 0)}/${
                        dayIndex === 0 ? 6 : dayIndex - 1
                      }`}
                    >
                      <Button spaceBelow="lg">Previous day</Button>
                    </Link>
                    <Link
                      to={`/plan/${weekIndex + (dayIndex === 6 ? 1 : 0)}/${
                        dayIndex === 6 ? 0 : dayIndex + 1
                      }`}
                    >
                      <Button spaceBelow="lg">Next day</Button>
                    </Link>
                  </Controls>
                  <Controls>
                    <Link to="/plan/edit">
                      <Button.Ghost spaceBelow="lg">
                        Edit your Plan
                      </Button.Ghost>
                    </Link>
                  </Controls>
                </React.Fragment>
              );
            }}
          </CalendarPlanQuery>
        </Content>
      );
    }}
  </GetWeekIndexQuery>
);

export default CalendarDayView;
