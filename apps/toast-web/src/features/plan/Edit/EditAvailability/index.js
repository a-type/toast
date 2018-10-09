import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import DayRow from './DayRow';
import styled from 'styled-components';
import { HelpText } from 'components/typeset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  gap: var(--spacing-md);
`;

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
    <Grid>
      <div />
      {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
        <TopLabel>{meal}</TopLabel>
      ))}
      {new Array(7).fill(null).map((_, dayIndex) => (
        <React.Fragment>
          <SideLabel>{dayNames[dayIndex].slice(0, 3)}</SideLabel>
          <DayRow
            dayIndex={dayIndex}
            day={pathOr({}, ['days', dayIndex], plan)}
          />
        </React.Fragment>
      ))}
    </Grid>
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
