export default function (server) {
  server.get('/api/users', { users: [{ id: 1, name: 'Bob' }] });
}
