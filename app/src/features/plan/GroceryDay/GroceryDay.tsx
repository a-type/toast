import * as React from 'react';
import EditForm from './EditForm';
import GroceryDayEventCreator from './GroceryDayEventCreator';
import useGroceryDay from '../useGroceryDay';
import { Box } from '@material-ui/core';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [{ index }, loading, error] = useGroceryDay();

  if (loading || error) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <EditForm groceryDay={index || 0} />
      <Box ml={2}>
        <GroceryDayEventCreator dayIndex={index || 0} />
      </Box>
    </Box>
  );
};

export default GroceryDayBanner;
