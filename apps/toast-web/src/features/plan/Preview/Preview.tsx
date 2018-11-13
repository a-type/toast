import * as React from 'react';
import PreviewWeekQuery from './PreviewWeekQuery';
import PreviewCalendar from './PreviewCalendar';
import { PlanStrategy } from 'generated/schema';
import logger from 'logger';
import { Disconnected, Loader } from 'components/generic';

export interface PlanPreviewProps {
  strategy: PlanStrategy;
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

      return <PreviewCalendar week={data.schedule.previewWeek} />;
    }}
  </PreviewWeekQuery>
);

export default PlanPreview;
