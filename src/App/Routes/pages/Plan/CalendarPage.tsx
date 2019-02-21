import * as React from 'react';
import { DayView } from 'features/plan';
import { Linker } from 'features/recipes';
import Column from 'components/layout/Column';

const CalendarPage: React.SFC<{}> = ({}) => {
  return (
    <Column>
      <DayView />
      <Linker />
    </Column>
  );
};

export default CalendarPage;
