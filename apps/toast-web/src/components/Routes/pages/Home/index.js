// @flow

import React from 'react';
import { SingleColumn } from 'components/layouts';
import SearchBar from 'components/search/SearchBar';
import { H1, H2, P } from 'components/typeset';

export default () => (
  <SingleColumn>
    <SingleColumn.Content>
      <H1>Welcome to Toast!</H1>
      <P>We're still setting up around here, but here's the idea:</P>
      <H2>Toast is a smarter way to find recipes.</H2>
      <P>
        Unlike most other recipe sites, Toast understands ingredients. It can
        find recipes which contain ingredients you like, or avoid the ones you
        don't. That's just the start. With a search that actually understands
        the food you're cooking, there's so much more we're looking forward to
        doing. Stay tuned!
      </P>
    </SingleColumn.Content>
  </SingleColumn>
);
