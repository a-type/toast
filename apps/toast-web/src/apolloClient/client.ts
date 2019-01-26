import ApolloClient from 'apollo-client';
import { Operation, ApolloLink, Observable } from 'apollo-link';
import resolvers, { defaults } from './resolvers';
import firebase from 'services/firebase';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import customFetch from './fetch';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'generated/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
const stateLink = withClientState({ resolvers, defaults, cache });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});
const requestHandler = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      (async () => {
        try {
          const token =
            firebase.auth().currentUser &&
            (await firebase.auth().currentUser.getIdToken(true));
          if (token) {
            operation.setContext({
              headers: {
                authorization: token,
              },
            });
          }
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        } catch (err) {
          observer.error.bind(observer)(err);
        }
      })();

      return () => {
        if (handle) handle.unsubscribe;
      };
    }),
);

const httpLink = createUploadLink({
  uri: '/api',
  credentials: 'same-origin',
  fetch: customFetch,
});

const link = ApolloLink.from(
  [errorLink, requestHandler, stateLink, httpLink].filter(Boolean),
);

const client = new ApolloClient({
  cache,
  link,
});

export default client;
