import * as React from 'react';
import { DayView } from 'features/plan';
import { Box } from 'grommet';
import { Linker } from 'features/recipes';

const CalendarPage: React.SFC<{}> = ({}) => {
  return (
    <Box direction="column" width="100%" pad="large">
      <Box
        margin={{ horizontal: 'auto', vertical: 'large' }}
        width="100%"
        style={{ maxWidth: '900px' }}
      >
        <DayView />
        <Linker />
      </Box>
    </Box>
  );
};

export default CalendarPage;
