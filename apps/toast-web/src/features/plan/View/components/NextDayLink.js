import React from 'react';
import { Link } from 'components/typeset';
import { Button } from 'components/generic';

export default ({ weekIndex, dayIndex }) => (
  <Link.Clear
    to={`/plan/${weekIndex + (dayIndex === 6 ? 1 : 0)}/${
      dayIndex === 6 ? 0 : dayIndex + 1
    }`}
  >
    <Button>Next day</Button>
  </Link.Clear>
);
