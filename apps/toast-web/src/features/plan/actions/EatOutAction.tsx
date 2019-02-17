import * as React from 'react';
import { Card } from 'components/generic';
import { MealActionEatOut } from 'generated/schema';
import { formatActionType } from 'formatters';
import { Text } from 'grommet';

interface CalendarEatActionProps {
  action: MealActionEatOut;
}

const CalendarEatOutAction: React.SFC<CalendarEatActionProps> = ({
  action,
}) => {
  return (
    <Card>
      <Text>{formatActionType(action.type)}</Text>
    </Card>
  );
};

export default CalendarEatOutAction;
