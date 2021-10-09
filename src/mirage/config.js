import { createServer, Factory, association } from 'miragejs';
import { createGraphQLHandler } from '@miragejs/graphql';
import faker from 'faker';
import { loader } from 'graphql.macro';
const graphQLSchema = loader('./../../schema/schema.graphql');

export default function createMirage() {
  createServer({
    routes() {
      this.post('/graphql', createGraphQLHandler(graphQLSchema, this.schema));
    },

    seeds(server) {
      server.createList('Quack', 30);
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
