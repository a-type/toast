import * as React from 'react';
import { pathOr } from 'ramda';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { PlanDay } from 'generated/schema';
import CalendarPlanQuery from './CalendarPlanQuery';
import { Link, Button, Loader, Disconnected } from 'components/generic';
import logger from 'logger';

export default ({ weekIndex }: { weekIndex: number }) => (
  <Content>
    <CalendarPlanQuery variables={{ weekIndex }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loader size={90} />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        const days = pathOr(
          [],
          ['me', 'group', 'plan', 'week', 'days'],
          data,
        ) as PlanDay[];

        return (
          <React.Fragment>
            {days.map((day, index) => (
              <CalendarDay
                key={day.id}
                day={day}
                weekIndex={weekIndex}
                dayIndex={index}
              />
            ))}
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
    <Controls>
      <Link to={`/plan/calendar/${weekIndex - 1}`}>
        <Button>Previous</Button>
      </Link>
      <Link to={`/plan/calendar/${weekIndex + 1}`}>
        <Button>Next</Button>
      </Link>
    </Controls>
  </Content>
);
