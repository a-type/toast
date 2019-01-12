import * as React from 'react';
import Correct from 'features/recipes/Correct';
import { Layout } from 'components/layout';
import { BackgroundStyle } from 'components/layout/types';

export default ({ match: { params } }) => (
  <Layout backgroundStyle={BackgroundStyle.Brand}>
    <Correct recipeId={params.recipeId} />
  </Layout>
);
