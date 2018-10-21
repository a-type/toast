import * as React from 'react';
import { pathOr } from 'ramda';
import { CalendarDay } from './components';
import { Content } from 'components/layouts';
import * as ReactApollo from 'react-apollo';
import { CalendarPlan, PlanDay } from 'generated/schema';
import gql from 'graphql-tag';

const Document = gql`
  query CalendarPlan($weekIndex: Int!) {
    me {
      group {
        plan {
          id
          week(weekIndex: $weekIndex) {
            startDate
            id
            days {
              ...CalendarDay
            }
          }
        }
      }
    }
  }

  ${CalendarDay.fragments.day}
`;

const CalendarPlanProvider = props => (
  <ReactApollo.Query<CalendarPlan.Query, CalendarPlan.Variables>
    query={Document}
    {...props}
  />
)

export default ({ weekIndex }: { weekIndex: number }) => (
  <Content>
    <CalendarPlanProvider variables={{ weekIndex }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading</div>;
        }

        if (error) {
          return <div>Error</div>;
        }

        const days = pathOr([], ['me', 'group', 'plan', 'week', 'days'], data) as PlanDay[];

        return <div>{days.map((day, index) =>
          <CalendarDay key={day.id} day={day} weekIndex={weekIndex} dayIndex={index} />)}</div>;
      }}
    </CalendarPlanProvider>
  </Content>
);
