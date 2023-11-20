const { User, Collection } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const mongoose = require('mongoose');



const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('collections');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('collections')
            }            
            throw new AuthenticationError('You need to be logged in!');
        },
        collections: async (parent, args) => {
            try {
            return await Collection.find().populate('items');
            } catch (error) {
                console.error(error);
                throw error; // Rethrow the error to be caught by GraphQL
            }
        }
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
        editCollection: async (parent, { itemName, itemDescription, itemImage, itemTag, collectionId}, context) => {
            console.log("In edit collection")
            if( context.user) {
                const collection = await Collection.findOneAndUpdate(
                    { _id: collectionId },
                    { $addToSet: { items: { itemName, itemDescription, itemImage, itemTag, collectionId } }},
                    { new: true, runValidators: true }
                    )
                    return collection;
                }
        }

    }
}

module.exports = resolvers;