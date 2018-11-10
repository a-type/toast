import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import Layout from './Layout';
import { Filters, Recipes, Ingredients, Bar } from 'features/search';

export default () => (
  <SingleColumn wide>
    <Content>
      <Layout>
        <Bar data-grid-area="search" />
        <Ingredients data-grid-area="ingredients" />
        <Filters data-grid-area="filters" />
        <Recipes data-grid-area="recipes" />
      </Layout>
    </Content>
  </SingleColumn>
);
