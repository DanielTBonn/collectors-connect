const { User, Collection } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require('mongoose');



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('collections');
            }            
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            const users = await User.find().populate({
                path: 'collections',
                populate: {
                  path: 'items',
                  model: 'Item'
                }
              });
            console.log(users);
            return users;
        },
        singleUser: async (parent, { _id }) => {
            const user = await User.findById(_id).populate({
                path: 'collections',
                populate: {
                  path: 'items',
                  model: 'Item'
                }
              });
            return user;
        },
        collections: async (parent, { name }) => {
            try {
                if (name) {
                    // If a tag is provided, filter collections by tag
                    return await Collection.find({ name }).populate('items');
                  } else {
                    // If no tag is provided, return all collections
                    return await Collection.find().populate('items');
                  }
            } catch (error) {
                console.error(error);
                throw error; // Rethrow the error to be caught by GraphQL
            }
        },
        singleCollection: async (parent, { collectionId }) => {
            const collection = await Collection.findById(collectionId).populate('items');
              console.log(collection);
              return collection;
        },
        randomCollection: async () => {
            try {
              const randomCollection = await Collection.find().populate('items');
              
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
            

        
        
        const collection = await Collection.create({...args})
        console.log(collection);

        // ------------------------------------------------------------------------------------------------------------
        // --------------- CHANGE THE ID BELOW TO THE USER ID YOU ARE LOGGED INTO THAT YOU WANT TO TEST --------------- 
        // ------------------------------------------------------------------------------------------------------------
        await User.findOneAndUpdate(
            { _id: "655a99a85e983aa404f4dfbc" },
            { $addToSet: { collections: collection._id }},
            );
            // console.log(updateUser);
            //     if (!updateUser) {
                //         throw AuthenticationError;
                //     }
                
                return collection;    
        },
        deleteCollection: async () => {},
        addItem: async () => {},
        deleteItem: async () => {}
    }
}

module.exports = resolvers;