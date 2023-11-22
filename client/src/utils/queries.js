import { gql } from "@apollo/client";

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
  query collections {
    collections {
      _id
      name
      description
      image
      userId {
        _id
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