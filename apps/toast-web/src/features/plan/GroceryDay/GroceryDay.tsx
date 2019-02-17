import * as React from 'react';
import EditForm from './EditForm';
import { Day } from 'types/Day';
import GroceryDayQuery from './GroceryDayQuery';
import { pathOr } from 'ramda';
import GroceryDayEventCreator from './GroceryDayEventCreator';
import { DropButton, Box, Heading } from 'grommet';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <GroceryDayQuery>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }

        const groceryDay = pathOr(0, ['group', 'plan', 'groceryDay'], data);

        return (
          <DropButton
            open={isEditMode}
            onOpen={() => setEditMode(true)}
            onClose={() => setEditMode(false)}
            label={`Grocery day: ${Day[groceryDay]}`}
            dropContent={
              <Box pad="medium">
                <Heading level="5">Manage grocery day</Heading>
                <EditForm groceryDay={groceryDay} />
                <GroceryDayEventCreator dayIndex={groceryDay} />
              </Box>
            }
          />
        );
      }}
    </GroceryDayQuery>
  );
};

export default GroceryDayBanner;
