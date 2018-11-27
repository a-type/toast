import React from 'react';
import { Layout } from 'components/layout';
import { Filters, Recipes, Ingredients, Bar } from 'features/search';

export default () => (
  <Layout renderSecondaryContent={() => <Filters data-grid-area="filters" />}>
    <Bar data-grid-area="search" />
    <Ingredients data-grid-area="ingredients" />
    <Recipes data-grid-area="recipes" />
  </Layout>
);
