/**
 * TODO: does this need to be somewhere else?
 */
import * as React from 'react';
import { DayView } from 'features/plan';
import { Link } from 'components/generic';
import Invite from 'features/groups/Invite';
import { Button, Box } from 'grommet';

const CalendarPage: React.SFC<{}> = ({}) => {
  return (
    <Box direction="column" width="100%" pad="large">
      <Box
        margin={{ horizontal: 'auto', vertical: 'large' }}
        width="100%"
        style={{ maxWidth: '900px' }}
      >
        <DayView />
      </Box>
    </Box>
  );
};

export default CalendarPage;
