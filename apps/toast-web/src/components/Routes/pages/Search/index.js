// @flow

import React from 'react';
import { SingleColumn } from 'components/layouts';
import SearchBar from 'components/search/SearchBar';
import Results from 'components/search/Results';
import Filters from 'components/search/Filters';

export default () => (
  <SingleColumn>
    <SingleColumn.Content>
      <Filters />
    </SingleColumn.Content>
    <SingleColumn.Content>
      <Results />
    </SingleColumn.Content>
  </SingleColumn>
);
