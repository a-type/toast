import * as React from 'react';
import { Button, Link, Icon } from 'components/generic';

export default ({ weekIndex }: { weekIndex: number }) => (
  <Link to={`/plan/calendar/${weekIndex}`} spaceBelow="lg">
    <Button>
      <Icon name="calendar" />
      Calendar view
    </Button>
  </Link>
);
