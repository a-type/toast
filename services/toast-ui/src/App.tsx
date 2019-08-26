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
    gridTemplateAreas: "'content' 'guides'",
    gridTemplateRows: '1fr auto',
    gridTemplateColumns: '100%',

    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: "'nav content'",
      gridTemplateRows: '1fr',
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
    <AlertProvider>
      <Router history={history}>
        <TokenProvider>
          <LinkerContextProvider>
            <Suspense fallback={<Loader />}>
              <Helmet title="Toast" />
              <Box className={classes.mainGrid}>
                <ErrorBoundary>
                  <Navigation gridArea="nav" />
                </ErrorBoundary>
                <Box className={classes.content}>
                  <ErrorBoundary>
                    <ToastAppBar gridArea="appBar" />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <Pages />
                  </ErrorBoundary>
                </Box>
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
  );
};

export default hot(props => (
  <ApolloProvider client={apolloClient}>
    <MuiThemeProvider theme={theme}>
      <App {...props} />
    </MuiThemeProvider>
  </ApolloProvider>
));
