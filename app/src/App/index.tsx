import React, { FC, Suspense } from 'react';
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
import { GlobalLoader } from 'components/generic/Loader';
import Helmet from 'react-helmet';
import Guides from 'features/guides/Guides/Guides';
import styled from 'styled-components';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'components/generic/Alert';
import UpdateChecker from './UpdateChecker';

const MainContentBox = styled(Box)`
  overflow-y: auto;
  flex: 1 0 0;
`;

const MainGrid = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-areas: 'nav' 'content' 'guides';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;

  @media (min-width: ${NAV_SIDEBAR_MIN_WIDTH_PX}px) {
    grid-template-areas: 'nav content' 'nav guides';
    grid-template-rows: 1fr auto;
    grid-template-columns: auto 1fr;
  }
`;

const alertOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 10000,
  offset: '30px',
  transition: transitions.FADE,
};

const App: FC<{}> = () => (
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <Grommet theme={grommetTheme} full>
        <AlertProvider {...alertOptions} template={AlertTemplate}>
          <Router history={history}>
            <TokenContext.Provider>
              <LinkerContextProvider>
                <Suspense fallback={<GlobalLoader />}>
                  <Helmet>
                    <title>Toast</title>
                  </Helmet>
                  <MainGrid>
                    <Sidebar gridArea="nav" />
                    <MainContentBox width="100%" gridArea="content">
                      <Routes />
                    </MainContentBox>
                    <Guides gridArea="guides" />
                  </MainGrid>
                </Suspense>
              </LinkerContextProvider>
            </TokenContext.Provider>
          </Router>
          <GlobalStyle />
          <UpdateChecker />
        </AlertProvider>
      </Grommet>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default App;
