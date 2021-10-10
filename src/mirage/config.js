import { createServer, Factory, association } from 'miragejs';
import { createGraphQLHandler, mirageGraphQLFieldResolver } from '@miragejs/graphql';
import faker from 'faker';
import { loader } from 'graphql.macro';
const graphQLSchema = loader('./../../schema/schema.graphql');

export default function createMirage() {
  const PASSWORD = 'password';
  const AUTH_TOKEN = 'very_secret_token';

  createServer({
    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema, {
        resolvers: {
          Query: {
            feed(obj, args, context, info) {
              const { cursorId, limit } = args;
              delete args.cursorId;
              delete args.limit;
              const records = mirageGraphQLFieldResolver(obj, args, context, info);
              let recordIndex = records.indexOf(records.find((r) => r.id === cursorId)) + 1;
              return records.slice(recordIndex, recordIndex + limit);
            },

            me(obj, args, { mirageSchema, request: { requestHeaders } }, info) {
              let user = mirageSchema.db.users.find(requestHeaders.user_id);
              if (requestHeaders.authorization === AUTH_TOKEN && user) {
                return user;
              }
            },
          },
          Mutation: {
            authenticate(obj, args, { mirageSchema }, info) {
              let user = mirageSchema.db.users.where({ username: args.username })[0];
              if (user && args.password === PASSWORD) {
                return {
                  user: { attrs: user, __typename: 'User' },
                  authToken: AUTH_TOKEN,
                  errors: [],
                };
              } else {
                return {
                  errors: [{ attrs: { text: 'wrong email or password' }, __typename: 'Error' }],
                };
              }
            },
          },
        },
      });

      this.post('/graphql', graphQLHandler);
    },

    seeds(server) {
      server.create('User', { username: 'username' });
      server.createList('Quack', 90);
    },

    factories: {
      quack: Factory.extend({
        text() {
          return faker.lorem.sentence();
        },
        user: association(),

        createdAt(i) {
          return faker.date.recent(i);
        },
      }),

      user: Factory.extend({
        avatarUrl(i) {
          return faker.image.imageUrl(i + 1);
        },
        username() {
          return faker.internet.userName();
        },
        firstName() {
          return faker.name.firstName();
        },
        lastName() {
          return faker.name.lastName();
        },
      }),
    },
  });
}
