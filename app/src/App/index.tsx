import React, { FC, Suspense } from 'react';
import Routes from './Routes';
import { TokenContext } from 'features/auth';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import Navigation from 'features/structure/Navigation/Navigation';
import { Provider as LinkerContextProvider } from 'contexts/LinkerContext';
import { GlobalLoader } from 'components/generic/Loader';
import Helmet from 'react-helmet';
import Guides from 'features/guides/Guides/Guides';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';
import UpdateChecker from './UpdateChecker';
import { Global, css } from '@emotion/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme, { GlobalCssVariables } from 'theme';
import { Box, CssBaseline, Theme } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { ToastAppBar } from 'features/structure/AppBar';
import { makeStyles } from '@material-ui/styles';
import { AlertRenderer, AlertProvider } from 'contexts/AlertContext';
import { ErrorBoundary } from 'components/generic/ErrorBoundary';

const useStyles = makeStyles<Theme, {}>(theme => ({
  mainGrid: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateAreas: "'appBar' 'content' 'guides' 'nav'",
    gridTemplateRows: 'auto 1fr auto auto',
    gridTemplateColumns: '100%',

    [`@media (min-width: ${NAV_SIDEBAR_MIN_WIDTH_PX}px)`]: {
      gridTemplateAreas: "'nav content' 'nav guides'",
      gridTemplateRows: '1fr auto',
      gridTemplateColumns: 'auto 1fr',
    },
  },

  content: {
    width: '100%',
    gridArea: 'content',
    overflowY: 'auto',
  },
}));

const App: FC<{}> = props => {
  const classes = useStyles(props);

  return (
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <AlertProvider>
            <Router history={history}>
              <TokenContext.Provider>
                <LinkerContextProvider>
                  <Suspense fallback={<GlobalLoader />}>
                    <Helmet title="Toast" />
                    <Box className={classes.mainGrid}>
                      <ErrorBoundary>
                        <ToastAppBar gridArea="appBar" />
                      </ErrorBoundary>
                      <ErrorBoundary>
                        <Navigation gridArea="nav" />
                      </ErrorBoundary>
                      <Box className={classes.content}>
                        <ErrorBoundary>
                          <Routes />
                        </ErrorBoundary>
                      </Box>
                      <Guides gridArea="guides" />
                    </Box>
                  </Suspense>
                </LinkerContextProvider>
              </TokenContext.Provider>
            </Router>
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
            <GlobalCssVariables />
          </AlertProvider>
        </MuiThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default hot(App);
