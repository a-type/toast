import React from 'react';
import gql from 'fraql';
import { pathOr } from 'ramda';
import DayRow from './DayRow';

const EditAvailability = ({ plan }) => (
  <div>
    {new Array(7)
      .fill(null)
      .map((_, dayIndex) => (
        <DayRow
          dayIndex={dayIndex}
          day={pathOr({}, ['days', dayIndex], plan)}
        />
      ))}
  </div>
);

EditAvailability.fragments = {
  plan: gql`
    fragment EditAvailability on Plan {
      days {
        ${DayRow.fragments.day}
      }
    }
  `,
};

export default EditAvailability;
