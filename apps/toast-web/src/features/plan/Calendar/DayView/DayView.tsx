import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanDay, Plan } from 'generated/schema';
import { Content, Controls } from 'components/layouts';
import { Button, Link, Disconnected, Icon } from 'components/generic';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import CalendarPlanQuery from '../CalendarPlanQuery';
import logger from 'logger';
import { Redirect } from 'react-router';
import Meals from './Meals';

interface CalendarDayViewProps {
  weekIndex: number;
  dayIndex: number;
}

const CalendarDayView: React.SFC<CalendarDayViewProps> = ({
  weekIndex,
  dayIndex,
}) => (
  <Content>
    <CalendarPlanQuery variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <H1.Skeleton />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        if (!pathOr(null, ['me', 'group', 'plan'])) {
          return <Redirect to="/plan/edit" />;
        }

        const day = pathOr(
          null,
          ['me', 'group', 'plan', 'week', 'days', dayIndex],
          data,
        ) as PlanDay;

        return (
          <React.Fragment>
            <Controls>
              <Link to={`/plan/calendar/${weekIndex}`}>
                <Button>
                  <Icon name="calendar" /> Calendar view
                </Button>
              </Link>
            </Controls>
            <H1>{formatDay(day.date)}</H1>
            <Meals
              meals={day.meals}
              weekIndex={weekIndex}
              dayIndex={dayIndex}
            />
            <Controls>
              <Link
                to={`/plan/${weekIndex - (dayIndex === 0 ? 1 : 0)}/${
                  dayIndex === 0 ? 6 : dayIndex - 1
                }`}
              >
                <Button>Previous day</Button>
              </Link>
              <Link
                to={`/plan/${weekIndex + (dayIndex === 6 ? 1 : 0)}/${
                  dayIndex === 6 ? 0 : dayIndex + 1
                }`}
              >
                <Button>Next day</Button>
              </Link>
            </Controls>
            <Controls>
              <Link to="/plan/edit">
                <Button.Ghost>Edit your Plan</Button.Ghost>
              </Link>
            </Controls>
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
  </Content>
);

export default CalendarDayView;
