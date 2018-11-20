import * as React from 'react';
import { cold } from 'react-hot-loader';
import { Banner } from 'components/layouts';
import EditForm from './EditForm';
import { Span } from 'components/typeset';
import { Day } from 'types/Day';
import { Link, Button } from 'components/generic';

export interface GroceryDayBannerProps {
  groceryDay: number;
}

const GroceryDayBanner: React.SFC<GroceryDayBannerProps> = ({ groceryDay }) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <Banner>
      {isEditMode ? (
        <EditForm groceryDay={groceryDay} onSaved={() => setEditMode(false)} />
      ) : (
        <div>
          <Span>Grocery day: {Day[groceryDay]}</Span>
          <Link
            style={{ display: 'inline-block', marginLeft: 'var(--spacing-md)' }}
            onClick={() => setEditMode(true)}
          >
            <Button>Change</Button>
          </Link>
        </div>
      )}
    </Banner>
  );
};

export default cold(GroceryDayBanner);
