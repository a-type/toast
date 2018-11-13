import * as React from 'react';
import { Card } from 'components/generic';
import { PlanActionEatOut } from 'generated/schema';
import { Span } from 'components/typeset';
import { formatActionType } from 'formatters';

interface CalendarEatActionProps {
  action: PlanActionEatOut;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

const CalendarEatOutAction: React.SFC<CalendarEatActionProps> = ({
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

export default CalendarEatOutAction;
