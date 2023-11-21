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
        userId {
          _id
        }
        items {
          _id
          collectionId {
            _id
          }
          itemName
          itemDescription
          itemImage 
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
      collectionCount
      collections {
        _id
        name
        description
        image
        userId
        items {
          _id
          collectionId
          itemName
          itemDescription
          itemImage 
        }
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query user {
    user {
      _id
      username
      email
      collectionCount
      collections {
        _id
        name
        description
        image
        userId
        items {
          _id
          collectionId
          itemName
          itemDescription
          itemImage 
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query collections {
    collections {
      _id
      name
      description
      image
      userId
      items {
        collectionId
        itemName
        itemDescription
        itemImage
      }
    }
  }
`;

export const GET_SINGLE_COLLECTION = gql`
  query singleCollection {
    singleCollection {
      _id
      name
      description
      image
      userId
      items {
        collectionId
        itemName
        itemDescription
        itemImage
    }
  }
}
`;

export const GET_RANDOM_COLLECTION = gql`
  query getRandomCollection {
    randomCollection {
      _id
      name
      description
      image
      userId
      items {
        collectionId
        itemName
        itemDescription
        itemImage
      }
    }
  }
`;
