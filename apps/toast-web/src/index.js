import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apolloClient';
import { Router } from 'react-router-dom';
import history from './browserHistory';
import App from './App';
import './theme';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('main'),
);

module.hot.accept();
