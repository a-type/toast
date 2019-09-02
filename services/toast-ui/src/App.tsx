import React, { FC, Suspense } from 'react';
import { Pages } from 'pages/Pages';
import { TokenProvider } from 'contexts/TokenContext';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import Navigation from 'components/features/navigation/Navigation';
import { Provider as LinkerContextProvider } from 'contexts/LinkerContext';
import { Loader } from 'components/generic/Loader/Loader';
import Helmet from 'react-helmet';
import UpdateChecker from './UpdateChecker';
import { Global, css } from '@emotion/core';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { ToastAppBar } from 'components/features/AppBar';
import { AlertRenderer, AlertProvider } from 'contexts/AlertContext';
import { ErrorBoundary } from 'components/generic/ErrorBoundary';
import { AppLayout, AppLayoutContent } from 'components/layout/AppLayout';
import { DynamicThemeProvider } from 'themes/DynamicThemeProvider';

const App: FC<{}> = props => {
  return (
    <AlertProvider>
      <TokenProvider>
        <LinkerContextProvider>
          <Suspense fallback={<Loader />}>
            <Helmet title="Toast" />
            <AppLayout>
              <ErrorBoundary>
                <Navigation gridArea="nav" />
              </ErrorBoundary>
              <AppLayoutContent>
                <ErrorBoundary>
                  <ToastAppBar gridArea="appBar" />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Pages />
                </ErrorBoundary>
              </AppLayoutContent>
            </AppLayout>
          </Suspense>
        </LinkerContextProvider>
      </TokenProvider>
      <AlertRenderer />
      <UpdateChecker />
      <CssBaseline />
      <Global
        styles={css`
          html,
          body,
          #main {
            height: 100vh;
          }
          body {
            overflow-y: hidden;
            position: relative;
          }
          ::selection,
          ::moz-selection {
            background: #ffe6bd;
          }
        `}
      />
    </AlertProvider>
  );
};

export default hot(props => (
  <Router history={history}>
    <ApolloProvider client={apolloClient}>
      <DynamicThemeProvider>
        <App {...props} />
      </DynamicThemeProvider>
    </ApolloProvider>
  </Router>
));
