/**
 * TODO: does this need to be somewhere else?
 */
import * as React from 'react';
import { GroceryDayBanner, DayView } from 'features/plan';
import { Layout } from 'components/layout';

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
    </Layout>
  );
};

export default CalendarPage;
