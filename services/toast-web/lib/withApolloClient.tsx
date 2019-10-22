import React from 'react';
import Head from 'next/head';
import initApollo from './initApollo';
import { getToken } from './auth';

export default (AppComponent: any, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, token, ...pageProps }) => {
    // apolloClient will be passed in during the initial getDataFromTree,
    // but not for the full server or client render
    const client =
      apolloClient ||
      initApollo(apolloState, { getToken: token ? () => token : getToken });
    return <AppComponent {...pageProps} apolloClient={client} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      AppComponent.displayName || AppComponent.name || 'Component';

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || AppComponent.getInitialProps) {
    WithApollo.getInitialProps = async (context: any) => {
      const { AppTree, ctx } = context;

      const token = getToken(ctx);
      const apolloClient = initApollo({}, { getToken: () => token });

      (ctx as any).apolloClient = apolloClient;

      const appProps = AppComponent.getInitialProps
        ? await AppComponent.getInitialProps(context)
        : {};

      if (typeof window === 'undefined') {
        /// when redirecting, response is finished. no point in continuing render
        if (ctx.res && ctx.res.finished) {
          return {};
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree {...appProps} apolloClient={apolloClient} />,
            );
          } catch (err) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error(`Error while running "getDataFromTree"`, err);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...appProps,
        apolloState,
        token,
      };
    };
  }

  return WithApollo;
};
