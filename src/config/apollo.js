import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function initApollo() {
  return new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            feed: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
    headers: {
      authorization: localStorage.getItem('authToken'),
      user_id: localStorage.getItem('userId'),
    },
  });
}
