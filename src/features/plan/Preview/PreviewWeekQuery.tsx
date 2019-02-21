import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { PreviewWeek } from 'generated/schema';
import PreviewCalendar from './PreviewCalendar';

export const Document = gql`
  query PreviewWeek($strategy: ScheduleStrategy!) {
    schedule {
      id
      templateWeek(strategy: $strategy) {
        id
        ...PlanPreviewMeal
      }
    }
  }

  ${PreviewCalendar.fragments.week}
`;

interface PreviewWeekQueryProps {
  variables?: PreviewWeek.Variables;
  skip?: boolean;
  children(
    result: QueryResult<PreviewWeek.Query, PreviewWeek.Variables>,
  ): React.ReactNode;
}

const PreviewWeekQuery: React.SFC<PreviewWeekQueryProps> = props => (
  <Query<PreviewWeek.Query, PreviewWeek.Variables>
    query={Document}
    {...props}
  />
);

export default PreviewWeekQuery;
