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
        _id: ID!
        name: String
        description: String
        image: String
        items: [Item]
        tag: String
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
        collection: [Item]
        item: Item
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs