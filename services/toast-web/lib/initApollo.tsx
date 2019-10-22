import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../generated/fragmentTypes.json';
import fetch from 'isomorphic-unfetch';
import { ApolloLink } from 'apollo-link';
import config from '../config/config';

let apolloClient: ApolloClient<any> = null;

const create = (
  initialState: any,
  {
    getToken,
  }: {
    getToken: () => string;
  },
) => {
  const isBrowser = typeof window !== 'undefined';

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(
    initialState || {},
  );

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

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: token } : {}),
      },
    };
  });

  const httpLink = createUploadLink({
    uri: `${config.apiHost}/api`,
    credentials: 'include',
    fetch: !isBrowser ? fetch : window.fetch,
  });

  const link = ApolloLink.from([errorLink, authLink, httpLink].filter(Boolean));

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link,
    cache,
  });
};

export default (
  initialState: any,
  // this can probably be simplified
  {
    getToken,
  }: {
    getToken: () => string;
  },
) => {
  if (typeof window === 'undefined') {
    return create(initialState, { getToken });
  }

  if (!apolloClient) {
    apolloClient = create(initialState, { getToken });
  }

  return apolloClient;
};
