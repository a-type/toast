import React, { SFC, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Text, Box } from 'grommet';
import Setup from './Setup';
import { pathOr } from 'ramda';
import DayView from './DayView/DayView';
import { startOfDay, isSameDay, getDate, parse } from 'date-fns';
import Calendar from 'components/generic/Calendar';
import { MealFragment } from './DayView/Meal';
import { CalendarDay } from 'components/generic/Calendar/Calendar';
import { PlanDayData } from './types';

const GetPlanQuery = gql`
  query GetPlanQuery {
    me {
      id
      group {
        id
        planDays {
          id
          date

          breakfast {
            ...MealFragment
          }
          lunch {
            ...MealFragment
          }
          dinner {
            ...MealFragment
          }
        }
      }
    }
  }

  ${MealFragment}
`;

export type GetPlanQueryResult = {
  me: {
    id: string;
    group?: {
      id: string;
      planDays: PlanDayData[];
    };
  };
};

const isCookingSomething = (day: PlanDayData) =>
  !!pathOr(0, ['breakfast', 'cooking', 'length'], day) ||
  !!pathOr(0, ['lunch', 'cooking', 'length'], day) ||
  !!pathOr(0, ['dinner', 'cooking', 'length'], day);

interface PlanViewProps {}

const PlanView: SFC<PlanViewProps> = ({}) => {
  const { data, loading, error, refetch } = useQuery<GetPlanQueryResult>(
    GetPlanQuery,
  );
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

  const group = pathOr(null, ['me', 'group'], data);

  const orderedDays = pathOr([], ['planDays'], group).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  if (!group) {
    return <Setup onCreated={refetch} />;
  }

  const selectedDay = orderedDays.find(planDay => {
    return isSameDay(parse(planDay.date), date);
  });

  const startDate = parse(orderedDays[0].date);
  const endDate = parse(orderedDays[orderedDays.length - 1].date);
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
          const planDay = orderedDays.find(day =>
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
