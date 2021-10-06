import { createServer } from 'miragejs';
import quacksEndpoint from './quacks';
import usersEndpoint from './users';

export default function createMirage() {
  let server = createServer();

  usersEndpoint(server);
  quacksEndpoint(server);
}
