import { useMutation, useQuery } from '@apollo/client';
import Quack from './Quack';
import { gql } from 'graphql.macro';
import { MAIN_USER_INFO } from '../fragments/MainUserInfo';

const DELETE_QUACK = gql`
  mutation deleteQuack($id: ID!) {
    deleteQuack(id: $id) {
      id
    }
  }
`;
const QUACKS_QUERY = gql`
  ${MAIN_USER_INFO}
  query QuacksQuery {
    quacks {
      id
      text
      user {
        id
        ...MainUserInfo
      }
    }
  }
`;

function Quacks(props) {
  let { loading, error, data } = useQuery(QUACKS_QUERY);

  let [mutateFunction] = useMutation(DELETE_QUACK, {
    update(cache, { data: { deleteQuack } }) {
      cache.evict({ id: cache.identify(deleteQuack) });
      cache.gc();
    },
  });

  let removeQuack = (quack) => {
    mutateFunction({ variables: { id: quack.id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.quacks.map((quack) => (
    <div key={quack.id}>
      <Quack quack={quack} removeQuack={removeQuack} />
    </div>
  ));
}

export default Quacks;
