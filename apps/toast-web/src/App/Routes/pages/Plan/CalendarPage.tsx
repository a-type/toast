/**
 * TODO: does this need to be somewhere else?
 */
import * as React from 'react';
import { GroceryDayBanner, DayView, Queries } from 'features/plan';
import { Layout } from 'components/layout';
import { Link, Button } from 'components/generic';

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
        <Button.Ghost>Edit your plan</Button.Ghost>
      </Link>
    </Layout>
  );
};

export default CalendarPage;
