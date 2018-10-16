import React from 'react';
import { Link } from 'components/typeset';
import { Button } from 'components/generic';

export default ({ weekIndex, dayIndex }) => (
  <Link.Clear
    to={`/plan/${weekIndex - (dayIndex === 0 ? 1 : 0)}/${
      dayIndex === 0 ? 6 : dayIndex - 1
    }`}
  >
    <Button.Ghost>Previous day</Button.Ghost>
  </Link.Clear>
);
