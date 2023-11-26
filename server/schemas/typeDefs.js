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
        userId: User
        items: [Item]
    }

    type Item {
        _id: ID!
        collectionId: Collection
        itemName: String
        itemDescription: String
        itemImage: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        singleUser(_id: ID!): User
        collections(name: String): [Collection]
        singleCollection(collectionId: ID!): Collection
        randomCollection: Collection
        items: [Item]
        singleItem(itemId: ID!): Item
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCollection(name: String!, description: String, items: [String] = [], image: String = "placeholder.jpg"): Collection
        deleteCollection(collectionId: ID!): User
        editCollection(collectionId: ID!, name: String!, description: String!, image: String!): Collection
        addItem(itemName: String!, itemDescription: String!, itemImage: String!, collectionId: String!): Item
        deleteItem(itemId: ID!): Collection
        editItem(itemId: ID!, itemName: String!, itemDescription: String!, itemImage: String!): Collection
    }
`;

module.exports = typeDefs