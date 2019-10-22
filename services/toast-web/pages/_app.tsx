import React from 'react';
import App from 'next/app';
import withApolloClient from '../lib/withApolloClient';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../themes/yellowTheme';
import { CssBaseline, Button } from '@material-ui/core';
import Head from 'next/head';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutNavigation,
  AppLayoutAppBar,
} from '../components/layout/AppLayout';
import Navigation from '../components/navigation/Navigation';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastAppBar } from '../components/navigation/AppBar';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';

const CloseSnackbarButton = ({ barKey }: { barKey: string }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <Button
      variant="text"
      color="primary"
      onClick={() => closeSnackbar(barKey)}
    >
      Close
    </Button>
  );
};

const closeSnackbarAction = (key: string) => (
  <CloseSnackbarButton barKey={key} />
);

class MyApp extends App<{ apolloClient: ApolloClient<any> }> {
  componentDidMount() {
    // remove server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <>
        <Head>
          <title>Toast</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SnackbarProvider maxSnack={2} action={closeSnackbarAction}>
                <AppLayout>
                  <AppLayoutAppBar>
                    <ToastAppBar />
                  </AppLayoutAppBar>
                  <AppLayoutNavigation>
                    <Navigation />
                  </AppLayoutNavigation>
                  <AppLayoutContent>
                    <Component {...pageProps} />
                  </AppLayoutContent>
                </AppLayout>
              </SnackbarProvider>
            </ThemeProvider>
          </AuthProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApolloClient(MyApp);
