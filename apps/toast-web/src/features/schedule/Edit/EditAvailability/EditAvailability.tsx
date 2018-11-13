import React from 'react';
import gql from 'graphql-tag';
import { pathOr } from 'ramda';
import DayRow from './DayRow';
import styled from 'styled-components';
import { HelpText } from 'components/typeset';
import { MealGrid } from 'features/schedule/Edit/components';

const TopLabel = styled.span`
  text-align: center;
  margin: auto;
`;

const SideLabel = styled.span`
  text-align: right;
  margin: auto;
  margin-right: var(--spacing-sm);
`;

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const EditAvailability = ({ schedule }) => {
  const meals = pathOr([], ['meals'], schedule);

  return (
    <div>
      <HelpText spaceBelow="lg">
        What's your average week look like? How much time would you like to
        spend on each meal? How you answer is up to you; anywhere from
        'realistic' to 'aspirational'.
      </HelpText>
      <MealGrid>
        {({ getMealStyle }) =>
          new Array(7).fill(null).map((_, dayIndex) => {
            const dayMeals = meals
              .filter(meal => meal.dayIndex === dayIndex)
              .sort((a, b) => a.mealIndex - b.mealIndex);

            return (
              <DayRow
                key={`day_${dayIndex}`}
                dayIndex={dayIndex}
                meals={dayMeals}
                getMealStyle={getMealStyle}
              />
            );
          })
        }
      </MealGrid>
    </div>
  );
};

EditAvailability.fragments = {
  schedule: gql`
    fragment EditAvailability on Schedule {
      id
      meals {
        ...DayRowMeal
      }
    }

    ${DayRow.fragments.meals}
  `,
};

export default EditAvailability;
