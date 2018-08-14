// @flow

import React from 'react';
import Layout from './Layout';
import Content from './Content';
import SearchBar from 'components/search/SearchBar';
import { H1, H2, P } from 'components/typeset';

export default () => (
  <Layout>
    <Content>
      <H1>Welcome to Toast!</H1>
      <P>We're still setting up around here, but here's the idea:</P>
      <H2>Toast is a smarter way to find recipes.</H2>
      <P>
        Unlike most other recipe sites, Toast understands ingredients. It can
        find recipes which contain ingredients you like, or avoid the ones you
        don't. That's just the start. With a search that actually understands
        the food you're cooking, there's so much more we're looking forward to
        doing. Stay tuned!
      </P>
    </Content>
  </Layout>
);
