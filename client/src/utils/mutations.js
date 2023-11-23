import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    }
`;

//add a collection
export const ADD_COLLECTION = gql`
    mutation addCollection($name: String!, $description: String!, $image: String!) {
        addCollection(name: $name, description: $description, image: $image) {
            _id
            name
            description
            image

        }
    }
`;

export const DELETE_COLLECTION = gql`
    mutation deleteCollection($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId) {
            _id
            username
            collectionCount
            collections {
                _id
                name
                description
                image
                userId {
                    username
                }
                items {
                    itemName
                    collectionId {
                        _id
                    }
                }
            }
        }
    }
`;

export const ADD_ITEM = gql`
    mutation addItem($itemName: String!, $itemDescription: String!, $itemImage: String!, $collectionId: String!) {
        addItem(itemName: $itemName, itemDescription: $itemDescription, itemImage: $itemImage, collectionId: $collectionId) {
            _id
            collectionId {
                _id
            }
            itemName
            itemDescription
            itemImage
        }
    }
`;

export const DELETE_ITEM = gql`
    mutation deleteItem($itemId: ID!) {
        deleteItem(itemId: $itemId) {
            _id
            name
            description
            image
            userId {
                username
            }
            items {
                itemName
                collectionId {
                    _id
                }
            }
        }
    }
`;

// export const DELETE_COLLECTION = gql`
//     mutation deleteCollection($collectionId: ID!) {
//         deleteCollection(_id: $collectionId) {
//             _id
//             name
//             description
//             image
//             userId {
//                 username
//             }
//             items {
//                 itemName
//                 collectionId
//             }
//         }
//     }
// `;