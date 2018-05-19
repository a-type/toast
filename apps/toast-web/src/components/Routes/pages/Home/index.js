// @flow

import React from 'react';
import Layout from './Layout';
import RecipeSearch from 'components/search/RecipeSearch';
import SearchResults from 'components/search/Results';
import H1 from 'components/generic/H1';

export default () => (
  <Layout>
    <RecipeSearch />
    <SearchResults />
  </Layout>
);
