import * as React from 'react';
import { Link, Button } from 'components/generic';
import { Controls } from 'components/layout';

const PlanControls = () => {
  return (
    <Controls>
      <Link to="/plan/edit">
        <Button>Edit your Plan</Button>
      </Link>
    </Controls>
  );
};

export default PlanControls;
