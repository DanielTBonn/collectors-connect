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
        tag: String
        image: String
        items: [Item]
    }

    type Item {
        _id: ID!
        name: String
        description: String
        image: String
        tag: String
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
        addCollection(name: String!, description: String!, image: String!, tag: String!, items: [String]!): Collection
        editCollection(username: String!, collectionId: ID): User
        deleteCollection(collectionId: ID): User
    }
`;

module.exports = typeDefs