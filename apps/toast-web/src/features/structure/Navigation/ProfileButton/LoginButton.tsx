import React from 'react';
import { Link } from 'components/text';
import { Button } from 'grommet';

export default () => (
  <Link to={`/login?r=${window.location.pathname}`}>
    <Button label="Join or Log In" />
  </Link>
);
