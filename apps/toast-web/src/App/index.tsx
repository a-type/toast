import { hot } from 'react-hot-loader';
import React, { SFC } from 'react';
import Routes from './Routes';
import { Background } from 'components/generic';
import { TokenContext } from 'features/auth';
import { ApolloProvider } from 'react-apollo';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import { GlobalStyle, grommetTheme } from 'theme';
import { Grommet } from 'grommet';

const App: SFC<{}> = () => (
  <ApolloProvider client={apolloClient}>
    <Grommet theme={grommetTheme} full>
      <Router history={history}>
        <TokenContext.Provider>
          <Background.Manager>
            <Routes />
          </Background.Manager>
        </TokenContext.Provider>
      </Router>
      <GlobalStyle />
    </Grommet>
  </ApolloProvider>
);

export default hot(module)(App);
