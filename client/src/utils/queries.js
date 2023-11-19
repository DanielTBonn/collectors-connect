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
        userId
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
      userId
    }
  }
`;

//query for all users? will this be necessary?

//query to get collections to be used on main page and via search form
export const GET_COLLECTIONS = gql`
  query getCollections {
    collection {
      _id
      name
      description
      username
      image
      items {
        _id
        name
        description
        image
        tag
      }
      tag
      userId
    }
  }
`;

//query for a single collection

//query for a single item in a collection-to be accessed while viewing all items in a collection