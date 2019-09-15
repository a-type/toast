import React, { FC, Suspense } from 'react';
import { Pages } from 'pages/Pages';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import Navigation from 'components/features/navigation/Navigation';
import { Provider as LinkerContextProvider } from 'contexts/LinkerContext';
import { Loader } from 'components/generic/Loader/Loader';
import Helmet from 'react-helmet';
import UpdateChecker from './UpdateChecker';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { ToastAppBar } from 'components/features/AppBar';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'components/generic/ErrorBoundary';
import { AppLayout, AppLayoutContent } from 'components/layout/AppLayout';
import { DynamicThemeProvider } from 'themes/DynamicThemeProvider';
import { AuthProvider } from 'contexts/AuthContext';

const App: FC<{}> = props => {
  return (
    <SnackbarProvider maxSnack={2}>
      <AuthProvider>
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
      </AuthProvider>
      <UpdateChecker />
    </SnackbarProvider>
  );
};

export default hot(props => (
  <>
    <Router history={history}>
      <ApolloProvider client={apolloClient}>
        <DynamicThemeProvider>
          <CssBaseline />
          <App {...props} />
        </DynamicThemeProvider>
      </ApolloProvider>
    </Router>
  </>
));
