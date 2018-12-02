import * as React from 'react';
import { cold } from 'react-hot-loader';
import EditForm from './EditForm';
import { Span } from 'components/typeset';
import { Day } from 'types/Day';
import { Link, Button } from 'components/generic';
import GroceryDayQuery from './GroceryDayQuery';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <GroceryDayQuery>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }

        const groceryDay = data.group.plan.groceryDay;

        return isEditMode ? (
          <EditForm
            groceryDay={groceryDay}
            onSaved={() => setEditMode(false)}
          />
        ) : (
          <div>
            <Span>Grocery day: {Day[groceryDay]}</Span>
            <Link
              style={{
                display: 'inline-block',
                marginLeft: 'var(--spacing-md)',
              }}
              onClick={() => setEditMode(true)}
            >
              <Button>Change</Button>
            </Link>
          </div>
        );
      }}
    </GroceryDayQuery>
  );
};

export default cold(GroceryDayBanner);
