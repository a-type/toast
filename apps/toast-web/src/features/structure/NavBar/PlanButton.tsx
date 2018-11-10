import React from 'react';
import { Button, Link } from 'components/generic';

const PlanButton = props => {
  return (
    <Link nav to="/plan" tabIndex={-1} {...props}>
      <Button.Icon name="calendar" />
    </Link>
  );
};

export default PlanButton;
