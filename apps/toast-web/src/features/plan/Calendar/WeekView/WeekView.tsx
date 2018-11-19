import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanMeal } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { Link, Button } from 'components/generic';
import { H3, HelpText } from 'components/typeset';
import { formatDay, formatDateOnly } from 'formatters/date';
import groupMeals from 'features/plan/groupMeals';
import styled from 'styled-components';
import { getDay, subDays, addDays } from 'date-fns';

const PositiveText = styled(HelpText)`
  color: var(--color-positive);
  font-weight: normal;
`;

interface CalendarWeeklyViewProps {
  meals: PlanMeal[];
  groceryDay: number;
  setActiveSection(section: 'day' | 'calendar'): void;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  meals,
  groceryDay,
  setActiveSection,
  ...rest
}) => {
  // group by day
  const mealDays = groupMeals(meals);

  return (
    <Content {...rest}>
      {mealDays.map((dayMeals, index) => {
        const date = dayMeals[0].date;
        return (
          <div key={`day_${index}`}>
            <Link
              to={`/plan/${formatDateOnly(date)}`}
              onClick={() => setActiveSection('day')}
            >
              <H3 spaceBelow="sm">
                {formatDay(date)}{' '}
                {groceryDay === getDay(date) && (
                  <PositiveText>Grocery Day</PositiveText>
                )}
              </H3>
            </Link>
            <CalendarDay meals={dayMeals} />
          </div>
        );
      })}
      <Controls>
        <Link to={`/plan/${formatDateOnly(subDays(meals[0].date, 7))}/0`}>
          <Button>Previous</Button>
        </Link>
        <Link to={`/plan/${formatDateOnly(addDays(meals[0].date, 7))}/0`}>
          <Button>Next</Button>
        </Link>
      </Controls>
    </Content>
  );
};

export default CalendarWeeklyView;
