import * as React from 'react';
import { Card } from 'components/generic';
import { MealActionReadyMade } from 'generated/schema';
import { Span } from 'components/typeset';
import { formatActionType } from 'formatters';

interface CalendarEatActionProps {
  action: MealActionReadyMade;
}

const CalendarReadyMadeAction: React.SFC<CalendarEatActionProps> = ({
  action,
}) => {
  return (
    <Card>
      <Span>{formatActionType(action.type)}</Span>
    </Card>
  );
};

export default CalendarReadyMadeAction;
