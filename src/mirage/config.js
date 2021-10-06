import { createServer } from 'miragejs';
import users from './users';

export default function createMirage() {
  let server = createServer();

  users(server);
}
