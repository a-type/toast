import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import DayRow from './DayRow';
import styled from 'styled-components';
import { HelpText } from 'components/typeset';
import { MealGrid } from 'features/plan/Edit/components';

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

const EditAvailability = ({ plan }) => (
  <div>
    <HelpText spaceBelow="lg">
      What's your average week look like? How much time would you like to spend
      on each meal? How you answer is up to you; anywhere from 'realistic' to
      'aspirational'.
    </HelpText>
    <MealGrid>
      {({ getMealStyle }) =>
        new Array(7)
          .fill(null)
          .map((_, dayIndex) => (
            <DayRow
              dayIndex={dayIndex}
              day={pathOr({}, ['days', dayIndex], plan)}
              getMealStyle={getMealStyle}
            />
          ))
      }
    </MealGrid>
  </div>
);

EditAvailability.fragments = {
  plan: gql`
    fragment EditAvailability on Plan {
      id
      days {
        ${DayRow.fragments.day}
      }
    }
  `,
};

export default EditAvailability;
