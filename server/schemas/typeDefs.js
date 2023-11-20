const typeDefs = `
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        collectionCount: Int
        collections: [Collection]
    }

    type Collection {
        _id: ID
        name: String
        description: String
        image: String
        tag: String
        userId: ID
        items: [Item]
        comments: [Comment]
    }

    type Item {
        collectionId: ID!
        itemName: String
        itemDescription: String
        itemImage: String
        itemTag: String
        comments: [Comment]
    }

    type Comment {
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        me: User
        collections: [Collection]
        collection: Collection
        item: Item
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCollection(name: String!, description: String!, image: String!, tag: String!): Collection
        editCollection(itemName: String!, itemDescription: String!, itemImage: String!, itemTag: String!, collectionId: String!): Collection
        deleteCollection(collectionId: ID): User
    }
`;

module.exports = typeDefs