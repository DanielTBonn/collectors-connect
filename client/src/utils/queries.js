import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GET_ME {
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
  query GET_USERS {
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

export const GET_SINGLE_USER = gql`
  query GET_SINGLE_USER($id: ID!) {
    singleUser(_id: $id) {
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

export const GET_COLLECTIONS = gql`
  query collections($name: String) {
    collections(name: $name) {
      _id
      name
      description
      image
      userId {
        _id
        username
      }
      items {
        collectionId {
          _id
        }
        itemName
        itemDescription
        itemImage
      }
    }
  }
`;

export const GET_SINGLE_COLLECTION = gql`
  query GET_SINGLE_COLLECTION($collectionId: ID!) {
    singleCollection(collectionId: $collectionId) {
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
`;

export const GET_RANDOM_COLLECTION = gql`
  query getRandomCollection {
    randomCollection {
      _id
      name
      description
      image
      userId {
        _id
        username
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
`;
