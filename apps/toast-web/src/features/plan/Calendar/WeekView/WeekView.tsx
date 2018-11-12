import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanWeekMeal, PlanWeek } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { Link, Button, Loader, Disconnected } from 'components/generic';
import CalendarPlanQuery from '../CalendarPlanQuery';
import logger from 'logger';
import { Redirect } from 'react-router-dom';
import { H3 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import gql from 'graphql-tag';
import { addDays } from 'date-fns';

interface CalendarWeeklyViewProps {
  weekIndex: number;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  weekIndex,
}) => (
  <Content>
    <CalendarPlanQuery variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loader size={90} />;
        }
        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        if (!data) {
          return <Redirect to="/plan/edit" />;
        }

        const week = pathOr(null, ['week'], data) as PlanWeek;
        const meals = pathOr([], ['meals'], week) as PlanWeekMeal[];
        // group by day
        const mealDays = meals.reduce((days, meal) => {
          days[meal.dayIndex].push(meal);
          return days;
        }, []);

        return (
          <React.Fragment>
            {mealDays.map((dayMeals, index) => (
              <div key={`day_${index}`}>
                <Link to={`/plan/${weekIndex}/${index}`}>
                  <H3 spaceBelow="sm">
                    {formatDay(addDays(week.startDate, index))}
                  </H3>
                </Link>
                <CalendarDay
                  meals={dayMeals}
                  weekIndex={weekIndex}
                  dayIndex={index}
                />
              </div>
            ))}
            <Controls>
              <Link to={`/plan/calendar/${weekIndex - 1}`}>
                <Button>Previous</Button>
              </Link>
              <Link to={`/plan/calendar/${weekIndex + 1}`}>
                <Button>Next</Button>
              </Link>
            </Controls>
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
  </Content>
);

export default CalendarWeeklyView;
