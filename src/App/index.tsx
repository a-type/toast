import React, { SFC } from 'react';
import Routes from './Routes';
import { TokenContext } from 'features/auth';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import { GlobalStyle, grommetTheme } from 'theme';
import { Grommet, Box } from 'grommet';
import Sidebar from 'features/structure/Sidebar';
import { Provider as LinkerContextProvider } from 'contexts/LinkerContext';

const App: SFC<{}> = () => (
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <Grommet theme={grommetTheme} full>
        <Router history={history}>
          <TokenContext.Provider>
            <LinkerContextProvider>
              <Box direction="row" height="100%" width="100%">
                <Sidebar />
                <Routes />
              </Box>
            </LinkerContextProvider>
          </TokenContext.Provider>
        </Router>
        <GlobalStyle />
      </Grommet>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default App;
