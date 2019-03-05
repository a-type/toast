import React, { SFC, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Text, Box } from 'grommet';
import Setup from './Setup';
import { pathOr } from 'ramda';
import DayView from './DayView/DayView';
import { startOfDay, isSameDay } from 'date-fns';
import Calendar from 'components/generic/Calendar';

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

  fragment MealRecipeFragment on Recipe {
    id
    title
    coverImage {
      id
      url
    }
  }

  fragment MealFragment on PlanMeal {
    id

    cooking {
      ...MealRecipeFragment
    }

    eating {
      id

      cooking {
        ...MealRecipeFragment
      }
    }
  }
`;

interface PlanViewProps {}

const PlanView: SFC<PlanViewProps> = ({}) => {
  const { data, error, refetch } = useQuery(GetPlanQuery);
  const [date, setDate] = useState(startOfDay(new Date()));

  if (error) {
    return <Text>Dang. We couldn't load the plan.</Text>;
  }

  const group = pathOr(null, ['me', 'group'], data);

  if (!group) {
    return <Setup onCreated={refetch} />;
  }

  const selectedDay = group.planDays.find(planDay => {
    console.log(date);
    console.log(new Date(planDay.date));
    return isSameDay(new Date(planDay.date), date);
  });

  return (
    <Box>
      <DayView day={selectedDay} />
      <Calendar value={date} onChange={setDate} />
    </Box>
  );
};

export default PlanView;
