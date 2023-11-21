const { User, Collection, Item } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const mongoose = require('mongoose');



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('collections').populate({
                    path: 'collections',
                    populate: 'items'
                });
            }            
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            const users = await User.find().populate('collections').populate({
                path: 'collections',
                populate: 'items'
            });
            console.log(users);
            return users;
        },
        singleUser: async (parent, { username }) => {
            const user = await User.findOne({ username: username }).populate('collections').populate({
                path: 'collections',
                populate: ['items', 'userId']
            }
            );
            return user;
        },
        collections: async (parent, { name }) => {
            try {
                if (name) {
                    // If a tag is provided, filter collections by tag
                    return await Collection.findOne({ name }).populate('userId', 'items');
                  } else {
                    // If no tag is provided, return all collections
                    return await Collection.find().populate(['userId', 'items']);
                  }
            } catch (error) {
                console.error(error);
                throw error; // Rethrow the error to be caught by GraphQL
            }
        },
        singleCollection: async () => {},
        randomCollection: async () => {
            try {
              const randomCollection = await Collection.find().populate('userId');
              
              const randNum = Math.floor(Math.random() * randomCollection.length);
              console.log(randNum);
              console.log(randomCollection[randNum]);

             return randomCollection[randNum];
            } catch (error) {
                console.log(error);
              throw new Error('Error fetching random collection');
            }
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        addCollection: async (parent, args, context) => {
            
        console.log('add collection?')
        
        
        const collection = await Collection.create({
            ...args,
            userId: context.user ? context.user._id : "655d1294b83a63f31771c154"
        })
        console.log(collection);

        // ------------------------------------------------------------------------------------------------------------
        // --------------- CHANGE THE ID BELOW TO THE USER ID YOU ARE LOGGED INTO THAT YOU WANT TO TEST --------------- 
        // ------------------------------------------------------------------------------------------------------------
        await User.findOneAndUpdate(
            { _id: context.user ? context.user._id : "655d1294b83a63f31771c154" },
            { $addToSet: { collections: collection._id }},
            );
            // console.log(updateUser);
            //     if (!updateUser) {
                //         throw AuthenticationError;
                //     }
                
            return collection;    
        },
        deleteCollection: async () => {},
        addItem: async (parent, args, context) => {

            const item = await Item.create({...args})

            await Collection.findOneAndUpdate(
                { _id: args.collectionId },
                { $addToSet: { items: item._id}},
            )

            return item;
        },
        deleteItem: async () => {}
    }
}

module.exports = resolvers;