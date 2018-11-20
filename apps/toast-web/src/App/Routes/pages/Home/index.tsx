import React from 'react';
import Featured from 'features/recipes/Featured';
import { TwoColumn } from 'components/layouts';
import { QuickView } from 'features/plan/Calendar';

export default () => (
  <TwoColumn>
    <QuickView data-grid-area="secondary" />
    <Featured data-grid-area="main" />
  </TwoColumn>
);
