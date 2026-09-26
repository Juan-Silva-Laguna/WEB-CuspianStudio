import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  ApolloLink,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { tokenStorage } from '../storage/tokenStorage';

const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql';

const httpLink = createHttpLink({ uri: GRAPHQL_URL });

/** Auth link: attaches the stored JWT to every request. */
const authLink = new ApolloLink((operation, forward) => {
  const token = tokenStorage.getToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
  }));
  return forward(operation);
});

/** Error link: handles UNAUTHENTICATED errors globally. */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        tokenStorage.clear();
        window.location.href = '/login';
      }
    }
  }
  if (networkError) {
    console.error('[Network error]', networkError);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});
