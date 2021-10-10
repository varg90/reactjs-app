import { gql } from 'graphql.macro';

export const MAIN_USER_INFO = gql`
  fragment MainUserInfo on User {
    avatarUrl
    firstName
    lastName
    username
  }
`;
