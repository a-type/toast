import React from 'react';
import Routes from 'components/Routes';
import Layout from './Layout';
import NavBar from 'components/generic/NavBar';
import { Provider } from 'components/search/context';
import { hot } from 'react-hot-loader';
import { Modal } from 'components/generic';

export default hot(module)(() => (
  <Provider>
    <Layout>
      <NavBar />
      <Routes />
      <Modal.Layer />
    </Layout>
  </Provider>
));
