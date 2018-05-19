import React from 'react';
import Routes from 'components/Routes';
import Layout from './Layout';
import NavBar from 'components/generic/NavBar';
import { Provider } from 'components/search/context';
import { hot } from 'react-hot-loader';

export default hot(module)(() => (
  <Provider>
    <Layout>
      <NavBar />
      <Routes />
    </Layout>
  </Provider>
));
