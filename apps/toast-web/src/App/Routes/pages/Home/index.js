// @flow

import React from 'react';
import Featured from 'features/recipes/Featured';
import { PrioritizedPromotion } from 'features/promotions';
import { SingleColumn } from 'components/layouts';

export default () => (
  <SingleColumn>
    <Featured />
  </SingleColumn>
);
