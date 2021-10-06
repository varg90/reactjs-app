import { Response } from 'miragejs';

export default function quacksEndpoint(server) {
  let quacks = [
    {
      id: '1',
      text: 'Hm ok seems like I ended up on Business plan for some reason. Strange. Home seems to be ~$90/month which is what I expected!',
      user: {
        avatarUrl: '/avatars/1.jpg',
        firstName: 'Sam',
        lastName: 'Selikoff',
        username: 'samselikoff',
      },
    },
    {
      id: '2',
      text: 'Hm ok seems like I ended up on Business plan for some reason. Strange. Home seems to be ~$90/month which is what I expected!',
      user: {
        avatarUrl: '/avatars/2.jpg',
        firstName: 'Sam',
        lastName: 'Selikoff',
        username: 'samselikoff',
      },
    },
    {
      id: '3',
      text: 'Hm ok seems like I ended up on Business plan for some reason. Strange. Home seems to be ~$90/month which is what I expected!',
      user: {
        avatarUrl: '/avatars/3.jpg',
        firstName: 'Sam',
        lastName: 'Selikoff',
        username: 'samselikoff',
      },
    },
    {
      id: '4',
      text: 'Hm ok seems like I ended up on Business plan for some reason. Strange. Home seems to be ~$90/month which is what I expected!',
      user: {
        avatarUrl: '/avatars/1.jpg',
        firstName: 'Sam',
        lastName: 'Selikoff',
        username: 'samselikoff',
      },
    },
  ];

  server.get('/api/quacks', function () {
    return new Response(200, {}, { quacks });
  });

  server.del('/api/quacks/:id', function (_, { params: { id } }) {
    quacks = quacks.filter((quack) => quack.id !== id);
    return new Response(200, {}, { errors: 'BLA' });
  });
}
