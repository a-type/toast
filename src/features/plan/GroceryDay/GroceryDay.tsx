import * as React from 'react';
import EditForm from './EditForm';
import { Day } from 'types/Day';
import GroceryDayEventCreator from './GroceryDayEventCreator';
import { DropButton, Box, Heading } from 'grommet';
import useGroceryDay from '../useGroceryDay';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [isEditMode, setEditMode] = React.useState(false);
  const [{ index, name }, loading, error] = useGroceryDay();

  if (loading || error) {
    return null;
  }

  return (
    <DropButton
      open={isEditMode}
      onOpen={() => setEditMode(true)}
      onClose={() => setEditMode(false)}
      label={`Grocery day: ${name}`}
      dropContent={
        <Box pad="medium">
          <Heading level="5">Manage grocery day</Heading>
          <EditForm groceryDay={index || 0} />
          <GroceryDayEventCreator dayIndex={index || 0} />
        </Box>
      }
    />
  );
};

export default GroceryDayBanner;
