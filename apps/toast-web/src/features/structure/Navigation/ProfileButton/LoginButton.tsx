import React from 'react';
import { Link } from 'components/typeset';
import { Button } from 'components/generic';

export default () => (
  <Link to={`/login?r=${window.location.pathname}`}>
    <Button label="Join or Log In" />
  </Link>
);
