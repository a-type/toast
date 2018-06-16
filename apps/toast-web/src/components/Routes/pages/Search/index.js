// @flow

import React from 'react';
import Layout from './Layout';
import SearchBar from 'components/search/SearchBar';
import Results from 'components/search/Results';
import Filters from 'components/search/Filters';

export default () => (
  <Layout>
    <Filters />
    <Results />
  </Layout>
);
