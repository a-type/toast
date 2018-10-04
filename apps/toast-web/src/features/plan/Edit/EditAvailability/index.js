import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import DayRow from './DayRow';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  gap: var(--spacing-md);
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
  <Grid>
    {new Array(7).fill(null).map((_, dayIndex) => (
      <React.Fragment>
        <span>{dayNames[dayIndex]}</span>
        <DayRow
          dayIndex={dayIndex}
          day={pathOr({}, ['days', dayIndex], plan)}
        />
      </React.Fragment>
    ))}
  </Grid>
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
