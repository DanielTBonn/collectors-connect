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

//write mutations for:

//add a collection
export const ADD_COLLECTION = gql`
    mutation addCollection($name: String!, $description: String!, $image: String!, $tag: String!) {
        addCollection(name: $name, description: $description, image: $image, tag: $tag) {
            _id
            name
            description
            tag
            image

        }
    }
`;

export const EDIT_COLLECTION = gql`
    mutation editCollection($itemName: String!, $itemDescription: String!, $itemImage: String!, $itemTag: String!, $collectionId: String!) {
        editCollection(itemName: $itemName, itemDescription: $itemDescription, itemImage: $itemImage, itemTag: $itemTag, collectionId: $collectionId) {
            items {
                itemName
                itemDescription
                itemTag
                itemImage
                collectionId
            }
        }
    }
`;

//edit a collection

//delete a collection

//suspect we will need mutations also for add an item, edit an item and delete an item? if so we'll need to add those to typedefs as well