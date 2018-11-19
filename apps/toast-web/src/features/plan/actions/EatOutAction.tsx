import * as React from 'react';
import { Card } from 'components/generic';
import { MealActionEatOut } from 'generated/schema';
import { Span } from 'components/typeset';
import { formatActionType } from 'formatters';

interface CalendarEatActionProps {
  action: MealActionEatOut;
}

const CalendarEatOutAction: React.SFC<CalendarEatActionProps> = ({
  action,
}) => {
  return (
    <Card>
      <Span>{formatActionType(action.type)}</Span>
    </Card>
  );
};

export default CalendarEatOutAction;
