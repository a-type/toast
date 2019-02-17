import * as React from 'react';
import EditForm from './EditForm';
import { Day } from 'types/Day';
import GroceryDayQuery from './GroceryDayQuery';
import { pathOr } from 'ramda';
import GroceryDayEventCreator from './GroceryDayEventCreator';
import { Layout } from './components';
import { Text, Button, Box } from 'grommet';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <GroceryDayQuery>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }

        const groceryDay = pathOr(0, ['group', 'plan', 'groceryDay'], data);

        return isEditMode ? (
          <EditForm
            groceryDay={groceryDay}
            onSaved={() => setEditMode(false)}
          />
        ) : (
          <Box
            direction="column"
            align="start"
            background="white"
            pad="medium"
            style={{ borderRadius: 'var(--border-radius-md)' }}
          >
            <Text margin={{ bottom: 'medium' }}>
              Grocery day: {Day[groceryDay]}
            </Text>
            <Button
              margin={{ bottom: 'medium' }}
              label="Change"
              onClick={() => setEditMode(true)}
            />
            <GroceryDayEventCreator dayIndex={groceryDay} />
          </Box>
        );
      }}
    </GroceryDayQuery>
  );
};

export default GroceryDayBanner;
