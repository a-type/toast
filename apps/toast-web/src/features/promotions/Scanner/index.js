import React from 'react';
import { Banner } from 'components/layouts';
import { Button, Icon } from 'components/generic';
import { Span, P, Link } from 'components/typeset';
import { IsLoggedIn } from 'features/auth/gates';

export default ({ onAcknowledge }) => (
  <IsLoggedIn>
    <Banner onDismiss={onAcknowledge}>
      <P spaceBelow="0px">
        <Span>Scout new recipes from around the web using the&nbsp;</Span>
        <Link.Clear to="/scanner" onClick={onAcknowledge}>
          <Button label="Toast Scanner" />
        </Link.Clear>
      </P>
    </Banner>
  </IsLoggedIn>
);
