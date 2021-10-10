import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'graphql.macro';
import { useCallback, useState } from 'react';
import { MAIN_USER_INFO } from '../fragments/MainUserInfo';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Quack from './Quack';

const DELETE_QUACK = gql`
  mutation deleteQuack($id: ID!) {
    deleteQuack(id: $id) {
      id
    }
  }
`;
const QUACKS_QUERY = gql`
  ${MAIN_USER_INFO}
  query QuacksQuery($cursorId: ID, $limit: Int) {
    feed(cursorId: $cursorId, limit: $limit) {
      id
      text
      createdAt
      user {
        ...MainUserInfo
      }
    }
  }
`;

const PAGE_SIZE = 30;

function Quacks() {
  let { loading, error, data, fetchMore } = useQuery(QUACKS_QUERY, {
    variables: { limit: PAGE_SIZE },
  });

  let [quackToDelete, setQuackToDelete] = useState(null);

  useInfiniteScroll({
    fetchMore,
    getCursor: useCallback(() => data.feed[data.feed.length - 1].id, [data]),
  });

  let [mutateFunction] = useMutation(DELETE_QUACK, {
    update(cache, { data: { deleteQuack } }) {
      cache.evict({ id: cache.identify(deleteQuack) });
      cache.gc();
    },
    onCompleted() {
      setQuackToDelete(null);
    },
  });

  let removeQuack = useCallback(
    (quack) => {
      setQuackToDelete(quack);
      mutateFunction({ variables: { id: quack.id } });
    },
    [mutateFunction]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.feed.map((quack) => (
    <div key={quack.id}>
      <Quack quack={quack} removeQuack={removeQuack} isDeleting={quackToDelete === quack} />
    </div>
  ));
}

export default Quacks;
