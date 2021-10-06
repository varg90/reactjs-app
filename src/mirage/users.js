export default function usersEndpoint(server) {
  server.get('/api/users', { users: [{ id: 1, name: 'Bob' }] });
}
