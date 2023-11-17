import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      collectionCount
      collections {
        _id
        name
        description
        image
        items {
          _id
          name
          description
          image
          tag
        }
        tag
      }
    }
  }
`;

export const GET_USER_COLLECTIONS = gql`
  query getUserCollections($userId: ID!) {
    userCollections(userId: $userId) {
      _id
      name
      description
      image
      items {
        _id
        name
        description
        image
        tag
      }
      tag
    }
  }
`;
