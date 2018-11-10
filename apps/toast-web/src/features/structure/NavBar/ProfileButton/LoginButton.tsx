import React from 'react';
import { Link } from 'components/typeset';
import { Button } from 'components/generic';
import auth from 'services/auth';

export default () => (
  <Link onClick={() => auth.login()}>
    <Button>Join or Log In</Button>
  </Link>
);
