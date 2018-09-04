// @flow

import React from 'react';
import { SingleColumn } from 'components/layouts';
import Layout from './Layout';
import { Filters, Recipes, Ingredients } from 'features/search';

export default () => (
  <SingleColumn wide>
    <SingleColumn.Content>
      <Layout>
        <Layout.Ingredients>
          <Ingredients />
        </Layout.Ingredients>
        <Layout.Filters>
          <Filters />
        </Layout.Filters>
        <Layout.Recipes>
          <Recipes />
        </Layout.Recipes>
      </Layout>
    </SingleColumn.Content>
  </SingleColumn>
);
