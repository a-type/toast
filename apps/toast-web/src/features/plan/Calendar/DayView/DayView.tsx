import * as React from 'react';
import { PlanWeek } from 'generated/schema';
import { Content, Controls } from 'components/layouts';
import { Button, Link, Icon } from 'components/generic';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import Meals from './Meals';

interface CalendarDayViewProps {
  week: PlanWeek;
  weekIndex: number;
  dayIndex: number;
  setActiveSection(section: 'day' | 'calendar'): void;
}

const CalendarDayView: React.SFC<CalendarDayViewProps> = ({
  week,
  dayIndex,
  weekIndex,
  setActiveSection,
  ...rest
}) => {
  const meals = week.meals
    .filter(meal => meal.dayIndex === dayIndex)
    .sort((a, b) => a.mealIndex - b.mealIndex);

  const date = meals[0].date;

  return (
    <Content {...rest}>
      <H1>{formatDay(date)}</H1>
      <Meals meals={meals} weekIndex={weekIndex} dayIndex={dayIndex} />
      <Controls>
        <Link
          to={`/plan/${weekIndex - (dayIndex === 0 ? 1 : 0)}/${
            dayIndex === 0 ? 6 : dayIndex - 1
          }`}
        >
          <Button spaceBelow="lg">Previous day</Button>
        </Link>
        <Link onClick={() => setActiveSection('calendar')}>
          <Button spaceBelow="lg">
            <Icon name="calendar" /> Week
          </Button>
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
          <Button.Ghost spaceBelow="lg">Edit your Plan</Button.Ghost>
        </Link>
      </Controls>
    </Content>
  );
};

export default CalendarDayView;
