import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanWeekMeal, PlanWeek } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { Link, Button, Loader, Disconnected } from 'components/generic';
import CalendarPlanQuery from '../CalendarPlanQuery';
import logger from 'logger';
import { Redirect } from 'react-router-dom';
import { H3, HelpText } from 'components/typeset';
import { formatDay } from 'formatters/date';
import gql from 'graphql-tag';
import { addDays } from 'date-fns';
import groupMeals from 'features/plan/groupMeals';
import styled from 'styled-components';

const PositiveText = styled(HelpText)`
  color: var(--color-positive);
  font-weight: normal;
`;

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
        const groceryDay = pathOr(null, ['schedule', 'groceryDay'], data);

        const week = pathOr(null, ['week'], data) as PlanWeek;
        const meals = pathOr([], ['meals'], week) as PlanWeekMeal[];
        // group by day
        const mealDays = groupMeals(meals, groceryDay);

        return (
          <React.Fragment>
            {mealDays.map((dayMeals, index) => {
              const dayIndex = dayMeals[0].dayIndex;
              const date = dayMeals[0].date;
              return (
                <div key={`day_${index}`}>
                  <Link to={`/plan/${weekIndex}/${index}`}>
                    <H3 spaceBelow="sm">
                      {formatDay(date)}{' '}
                      {groceryDay === dayIndex && (
                        <PositiveText>Grocery Day</PositiveText>
                      )}
                    </H3>
                  </Link>
                  <CalendarDay
                    meals={dayMeals}
                    weekIndex={weekIndex}
                    dayIndex={dayIndex}
                  />
                </div>
              );
            })}
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
