import React from 'react';
import Routes from './Routes';
import Layout from './Layout';
import { NavBar } from 'features/structure';
import { hot } from 'react-hot-loader';
import { Modal } from 'components/generic';

export default hot(module)(() => (
  <Layout>
    <NavBar />
    <Routes />
    <Modal.Layer />
  </Layout>
));
