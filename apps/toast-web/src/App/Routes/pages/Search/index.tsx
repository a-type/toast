import React from 'react';
import { Layout } from 'components/layout';
import { Filters, Recipes, Ingredients, Bar } from 'features/search';

export default () => (
  <Layout renderSecondaryContent={() => <Filters />} secondaryContentFirst>
    <Bar />
    <Ingredients />
    <Recipes />
  </Layout>
);
