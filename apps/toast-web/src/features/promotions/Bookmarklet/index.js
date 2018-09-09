import React from 'react';
import { Banner } from 'components/layouts';
import { Button } from 'components/generic';
import { Span, P, Link } from 'components/typeset';
import { HasUserId } from 'features/auth/gates';

export default () => (
  <HasUserId>
    <Banner>
      <P>
        <Span>Scout new recipes from across the web using the </Span>
        <Link.Clear to="/scanner">
          <Button>Toast Scanner</Button>
        </Link.Clear>
      </P>
    </Banner>
  </HasUserId>
);
