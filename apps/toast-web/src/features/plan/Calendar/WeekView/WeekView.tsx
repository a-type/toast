import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanWeekMeal, PlanWeek } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { Link, Button } from 'components/generic';
import { H3, HelpText } from 'components/typeset';
import { formatDay } from 'formatters/date';
import groupMeals from 'features/plan/groupMeals';
import styled from 'styled-components';

const PositiveText = styled(HelpText)`
  color: var(--color-positive);
  font-weight: normal;
`;

interface CalendarWeeklyViewProps {
  weekIndex: number;
  dayIndex: number;
  week: PlanWeek;
  groceryDay: number;
  setActiveSection(section: 'day' | 'calendar'): void;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  weekIndex,
  dayIndex,
  week,
  groceryDay,
  setActiveSection,
  ...rest
}) => {
  const meals = pathOr([], ['meals'], week) as PlanWeekMeal[];
  // group by day
  const mealDays = groupMeals(meals, groceryDay);

  return (
    <Content {...rest}>
      {mealDays.map((dayMeals, index) => {
        const dayIndex = dayMeals[0].dayIndex;
        const date = dayMeals[0].date;
        return (
          <div key={`day_${index}`}>
            <Link
              to={`/plan/${weekIndex}/${dayIndex}`}
              onClick={() => setActiveSection('day')}
            >
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
        <Link to={`/plan/${weekIndex - 1}/0`}>
          <Button>Previous</Button>
        </Link>
        <Link to={`/plan/${weekIndex + 1}/0`}>
          <Button>Next</Button>
        </Link>
      </Controls>
    </Content>
  );
};

export default CalendarWeeklyView;
