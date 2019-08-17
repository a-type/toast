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
import Guides from 'components/features/guides/Guides';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';
import UpdateChecker from './UpdateChecker';
import { Global, css } from '@emotion/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme, { GlobalCssVariables } from 'theme';
import { Box, CssBaseline, Theme } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { ToastAppBar } from 'components/features/AppBar';
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
      <MuiThemeProvider theme={theme}>
        <AlertProvider>
          <Router history={history}>
            <TokenProvider>
              <LinkerContextProvider>
                <Suspense fallback={<Loader />}>
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
                        <Pages />
                      </ErrorBoundary>
                    </Box>
                    <Guides gridArea="guides" />
                  </Box>
                </Suspense>
              </LinkerContextProvider>
            </TokenProvider>
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
    </ApolloProvider>
  );
};

export default hot(App);
