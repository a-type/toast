import React from 'react';
import Head from 'next/head';
import initApollo from './initApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { getToken } from './auth';
import { NextPageContext } from 'next';

const tokenGetter = (context?: NextPageContext) => () => getToken(context);

export default (PageComponent: any, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client =
      apolloClient || initApollo(apolloState, { getToken: tokenGetter() });
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx;

      const apolloClient = (ctx.apolloClient = initApollo(
        {},
        { getToken: tokenGetter(ctx) },
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
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
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
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
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
};
