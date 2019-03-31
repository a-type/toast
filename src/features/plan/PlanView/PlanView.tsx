import React, { SFC, useState } from 'react';
import { Text, Box } from 'grommet';
import { pathOr } from 'ramda';
import DayView from './DayView/DayView';
import { startOfDay, isSameDay, getDate, parse } from 'date-fns';
import Calendar from 'components/generic/Calendar';
import { CalendarDay } from 'components/generic/Calendar/Calendar';
import { PlanDayData } from '../types';
import usePlan from '../usePlan';

const isCookingSomething = (day: PlanDayData) =>
  !!pathOr(0, ['breakfast', 'cooking', 'length'], day) ||
  !!pathOr(0, ['lunch', 'cooking', 'length'], day) ||
  !!pathOr(0, ['dinner', 'cooking', 'length'], day);

interface PlanViewProps {}

const PlanView: SFC<PlanViewProps> = ({}) => {
  const [planDays, loading, error, result] = usePlan();
  const [date, setDate] = useState(startOfDay(new Date()));

  if (loading) {
    return (
      <Box>
        <DayView />
      </Box>
    );
  }

  if (error) {
    return <Text>Dang. We couldn't load the plan.</Text>;
  }

  const selectedDay = planDays.find(planDay => {
    return isSameDay(parse(planDay.date), date);
  });

  const startDate = parse(planDays[0].date);
  const endDate = parse(planDays[planDays.length - 1].date);
  console.log(startDate, endDate);

  return (
    <Box>
      <DayView day={selectedDay} />
      <Calendar
        startDate={startDate}
        endDate={endDate}
        value={date}
        onChange={setDate}
        renderDate={({ date, disabled, otherMonth, selected, props }) => {
          const planDay = planDays.find(day =>
            isSameDay(parse(day.date), date),
          );
          const isCooking = isCookingSomething(planDay);

          return (
            <CalendarDay
              {...props}
              selected={selected}
              disabled={disabled}
              highlighted={isCooking}
            >
              {getDate(date)}
            </CalendarDay>
          );
        }}
      />
    </Box>
  );
};

export default PlanView;
