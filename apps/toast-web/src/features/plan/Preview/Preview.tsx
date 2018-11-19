import * as React from 'react';
import PreviewWeekQuery from './PreviewWeekQuery';
import PreviewCalendar from './PreviewCalendar';
import { ScheduleStrategy } from 'generated/schema';
import logger from 'logger';
import { Disconnected, Loader } from 'components/generic';

export interface PlanPreviewProps {
  strategy: ScheduleStrategy;
}

const PlanPreview: React.SFC<PlanPreviewProps> = ({ strategy }) => (
  <PreviewWeekQuery variables={{ strategy }}>
    {({ data, error, loading }) => {
      if (error) {
        logger.fatal(error);
        return <Disconnected />;
      }

      if (loading) {
        return <Loader size="72px" />;
      }

      return <PreviewCalendar week={data.schedule.templateWeek} />;
    }}
  </PreviewWeekQuery>
);

export default PlanPreview;
