import * as React from 'react';
import { pathOr } from 'ramda';
import { PlanDay } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Content, Controls } from 'components/layouts';
import { Link, Button, Loader, Disconnected } from 'components/generic';
import CalendarPlanQuery from '../CalendarPlanQuery';
import logger from 'logger';
import { Redirect } from 'react-router-dom';
import { H3 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import gql from 'graphql-tag';

interface CalendarWeeklyViewProps {
  weekIndex: number;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  weekIndex,
}) => (
  <Content>
    <CalendarPlanQuery variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loader size={90} />;
        }
        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        if (!data) {
          return <Redirect to="/plan/edit" />;
        }

        const days = pathOr([], ['week', 'days'], data) as PlanDay[];

        return (
          <React.Fragment>
            {days.map((day, index) => (
              <div key={day.id}>
                <Link to={`/plan/${weekIndex}/${index}`}>
                  <H3 spaceBelow="sm">{formatDay(day.date)}</H3>
                </Link>
                <CalendarDay day={day} weekIndex={weekIndex} dayIndex={index} />
              </div>
            ))}
            <Controls>
              <Link to={`/plan/calendar/${weekIndex - 1}`}>
                <Button>Previous</Button>
              </Link>
              <Link to={`/plan/calendar/${weekIndex + 1}`}>
                <Button>Next</Button>
              </Link>
            </Controls>
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
  </Content>
);

export default CalendarWeeklyView;
