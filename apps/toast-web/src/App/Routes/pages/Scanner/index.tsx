import React from 'react';
import { Layout, LayoutTypes } from 'components/layout';
import Promo from 'features/scanner/Promo';

export default () => (
  <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Art}>
    <Promo />
  </Layout>
);
