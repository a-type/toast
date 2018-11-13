import * as React from 'react';
import { Card } from 'components/generic';
import { PlanActionReadyMade } from 'generated/schema';
import { Span } from 'components/typeset';
import { formatActionType } from 'formatters';

interface CalendarEatActionProps {
  action: PlanActionReadyMade;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

const CalendarReadyMadeAction: React.SFC<CalendarEatActionProps> = ({
  action,
  weekIndex,
  dayIndex,
  mealIndex,
}) => {
  return (
    <Card>
      <Span>{formatActionType(action.type)}</Span>
    </Card>
  );
};

export default CalendarReadyMadeAction;
