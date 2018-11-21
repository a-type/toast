import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { Content, Controls } from 'components/layouts';
import { Button, Link, Icon } from 'components/generic';
import { H1 } from 'components/typeset';
import { formatDay, formatDateOnly } from 'formatters/date';
import Meals from './Meals';
import { subDays, addDays } from 'date-fns';

interface CalendarDayViewProps {
  meals: PlanMeal[];
  setActiveSection(section: 'day' | 'calendar'): void;
}

const CalendarDayView: React.SFC<CalendarDayViewProps> = ({
  meals,
  setActiveSection,
  ...rest
}) => {
  const date = meals[0].date;

  return (
    <div {...rest}>
      <H1>{formatDay(date)}</H1>
      <Meals meals={meals} />
      <Controls>
        <Link to={`/plan/${formatDateOnly(subDays(date, 1))}`}>
          <Button spaceBelow="lg">Previous day</Button>
        </Link>
        <Link onClick={() => setActiveSection('calendar')}>
          <Button spaceBelow="lg">
            <Icon name="calendar" /> Week
          </Button>
        </Link>
        <Link to={`/plan/${formatDateOnly(addDays(date, 1))}`}>
          <Button spaceBelow="lg">Next day</Button>
        </Link>
      </Controls>
      <Controls>
        <Link to="/plan/edit">
          <Button.Ghost spaceBelow="lg">Edit your Plan</Button.Ghost>
        </Link>
      </Controls>
    </div>
  );
};

export default CalendarDayView;
