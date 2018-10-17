import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'components/generic';
import { Link } from 'components/typeset';

export default () => (
  <Link to="/plan">
    <Button.Positive>
      <Icon name="calendar" />
      Plan
    </Button.Positive>
  </Link>
);
