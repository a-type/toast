import React from 'react';
import Layout from './Layout';
import Logo from 'components/brand/Logo';
import Link from 'components/generic/Link';
import { Consumer } from 'components/search/context';
import SearchBar from 'components/search/SearchBar';
import { withRouter } from 'react-router-dom';

export default withRouter(({ location }) => (
  <Layout>
    <Consumer>
      {({ actions }) => (
        <Link.Clear to="/" onClick={actions.reset}>
          <Logo />
        </Link.Clear>
      )}
    </Consumer>
    <SearchBar />
  </Layout>
));
