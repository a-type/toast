import * as React from 'react';
import { Card } from 'components/generic';
import { MealActionReadyMade } from 'generated/schema';
import { formatActionType } from 'formatters';
import { Text } from 'grommet';

interface CalendarEatActionProps {
  action: MealActionReadyMade;
}

const CalendarReadyMadeAction: React.SFC<CalendarEatActionProps> = ({
  action,
}) => {
  return (
    <Card>
      <Text>{formatActionType(action.type)}</Text>
    </Card>
  );
};

export default CalendarReadyMadeAction;
