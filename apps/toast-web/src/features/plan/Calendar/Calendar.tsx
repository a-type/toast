import * as React from 'react';
import CalendarPlanQuery from './CalendarPlanQuery';
import GetWeekIndexQuery from './GetWeekIndexQuery';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import { addDays, differenceInDays } from 'date-fns';
import logger from 'logger';
import LandingPage from 'features/plan/LandingPage';
import { pathOr } from 'ramda';
import { PlanWeek } from 'generated/schema';
import { Layout } from './components';
import CalendarWeeklyView from './WeekView';
import CalendarDayView from './DayView';
import { useMedia } from 'react-use';
import { cold } from 'react-hot-loader';

const getDayIndex = (
  today: Date,
  planStartWeekDate: number,
  planWeekIndex: number,
) => {
  const startDate = addDays(new Date(planStartWeekDate), planWeekIndex * 7);
  return Math.max(0, Math.min(6, differenceInDays(today, startDate)));
};

interface CalendarProps {
  weekIndex?: number;
  dayIndex?: number;
}

const Calendar: React.SFC<CalendarProps> = ({ weekIndex, dayIndex }) => {
  const today = new Date();
  const [activeSection, setActiveSection] = React.useState<'day' | 'calendar'>(
    'day',
  );
  const isWide = useMedia('(min-width: 1000px)');

  return (
    <GetWeekIndexQuery
      skip={!!weekIndex}
      variables={{
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }}
    >
      {({ data: indexData, loading: indexLoading, error: indexError }) => {
        if (indexLoading) {
          return <GlobalLoader />;
        }

        if (indexError) {
          return <Disconnected />;
        }

        const finalWeekIndex =
          weekIndex !== undefined ? weekIndex : indexData.planWeekIndex;
        const finalDayIndex =
          dayIndex !== undefined
            ? dayIndex
            : getDayIndex(
                today,
                indexData.scheduleStartWeekDate,
                finalWeekIndex,
              );

        return (
          <CalendarPlanQuery variables={{ weekIndex: finalWeekIndex }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <GlobalLoader />;
              }

              if (error) {
                logger.fatal(error);
                return <Disconnected />;
              }

              if (!data || !data.week) {
                return <LandingPage />;
              }

              const groceryDay = pathOr(null, ['schedule', 'groceryDay'], data);
              const week = pathOr(null, ['week'], data) as PlanWeek;

              return (
                <Layout isWide={isWide}>
                  {(isWide || activeSection === 'calendar') && (
                    <CalendarWeeklyView
                      setActiveSection={setActiveSection}
                      week={week}
                      groceryDay={groceryDay}
                      weekIndex={finalWeekIndex}
                      dayIndex={finalDayIndex}
                      data-grid-area="calendar"
                    />
                  )}
                  {(isWide || activeSection === 'day') && (
                    <CalendarDayView
                      setActiveSection={setActiveSection}
                      week={week}
                      weekIndex={finalWeekIndex}
                      dayIndex={finalDayIndex}
                      data-grid-area="day"
                    />
                  )}
                </Layout>
              );
            }}
          </CalendarPlanQuery>
        );
      }}
    </GetWeekIndexQuery>
  );
};

export default cold(Calendar);
