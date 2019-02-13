/**
 * TODO: does this need to be somewhere else?
 */
import * as React from 'react';
import { GroceryDayBanner, DayView, Queries } from 'features/plan';
import { Layout } from 'components/layout';
import { Link, Button } from 'components/generic';
import Invite from 'features/groups/Invite';

interface CalendarProps {
  date: Date;
}

const CalendarPage: React.SFC<{}> = ({}) => {
  return (
    <Layout
      renderBanner={() => <GroceryDayBanner />}
      renderSecondaryContent={() => <div>{/* TODO */}</div>}
    >
      <DayView />
      <Link to="/plan/edit">
        <Button label="Edit your plan" />
      </Link>
      <Invite />
    </Layout>
  );
};

export default CalendarPage;
