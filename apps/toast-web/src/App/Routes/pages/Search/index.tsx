import React from 'react';
import { TwoColumn, Content } from 'components/layouts';
import { Filters, Recipes, Ingredients, Bar } from 'features/search';
import { Navigation } from 'features/structure';

export default () => (
  <TwoColumn tabNames={['Search', 'Filters']}>
    <Navigation />
    <Content>
      <Bar data-grid-area="search" />
      <Ingredients data-grid-area="ingredients" />
      <Recipes data-grid-area="recipes" />
    </Content>
    <Content contentArea="secondary">
      <Filters data-grid-area="filters" />
    </Content>
  </TwoColumn>
);
