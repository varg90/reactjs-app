import { createServer, Factory, association } from 'miragejs';
import { createGraphQLHandler, mirageGraphQLFieldResolver } from '@miragejs/graphql';
import faker from 'faker';
import { loader } from 'graphql.macro';
const graphQLSchema = loader('./../../schema/schema.graphql');

export default function createMirage() {
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
          },
        },
      });

      this.post('/graphql', graphQLHandler);
    },

    seeds(server) {
      server.createList('Quack', 90);
    },

    factories: {
      quack: Factory.extend({
        text() {
          return faker.lorem.sentence();
        },
        user: association(),
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
