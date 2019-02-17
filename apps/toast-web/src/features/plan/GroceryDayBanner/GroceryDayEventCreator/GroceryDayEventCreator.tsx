import * as React from 'react';
import templateIcs from './templateIcs';
import { Link } from 'components/generic';
import { Button } from 'grommet';

export interface GroceryDayEventCreatorProps {
  dayIndex: number;
}

const GroceryDayEventCreator: React.SFC<GroceryDayEventCreatorProps> = ({
  dayIndex,
}) => {
  const ics = templateIcs(dayIndex);
  const dataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(ics)}`;
  const filename = 'groceryday.ics';

  return (
    <Link to={dataUrl} download={filename} forceRemote>
      <Button label="Add to Calendar" color="status-ok" />
    </Link>
  );
};

export default GroceryDayEventCreator;
