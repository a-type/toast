import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-template-rows: auto repeat(7, 1fr);
  grid-template-areas:
    'blank breakfast lunch dinner'
    'sunday meal0_0 meal0_1 meal0_2'
    'monday meal1_0 meal1_1 meal1_2'
    'tuesday meal2_0 meal2_1 meal2_2'
    'wednesday meal3_0 meal3_1 meal3_2'
    'thursday meal4_0 meal4_1 meal4_2'
    'friday meal5_0 meal5_1 meal5_2'
    'saturday meal6_0 meal6_1 meal6_2';
  gap: var(--spacing-md);

  margin-bottom: var(--spacing-lg);
`;

const TopLabel = styled.span`
  text-align: center;
  margin: auto;
  grid-area: ${props => props.area};
`;

const SideLabel = styled.span`
  text-align: right;
  margin: auto;
  margin-right: var(--spacing-sm);
  grid-area: ${props => props.area};
`;

export default ({ children }) => (
  <Grid>
    {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
      <TopLabel key={meal} area={meal.toLowerCase()}>
        {meal}
      </TopLabel>
    ))}
    {[
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ].map(day => (
      <SideLabel key={day} area={day.toLowerCase()}>
        {day}
      </SideLabel>
    ))}
    {children({
      getMealStyle: (dayIndex, mealIndex) => ({
        gridArea: `meal${dayIndex}_${mealIndex}`,
      }),
    })}
  </Grid>
);
