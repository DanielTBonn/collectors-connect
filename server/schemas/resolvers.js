const { User, Collection, Item } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require('mongoose');



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate({
                    path: 'collections',
                    populate: {
                      path: 'items',
                      model: 'Item'
                    }
            });
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
                const regex = name ? new RegExp(name, 'i') : null;

                if (regex) {
                    // If a tag is provided, filter collections by tag
                    return await Collection.find({ name: { $regex: regex } }).populate('items').populate('userId');
                  } else {
                    // If no tag is provided, return all collections
                    return await Collection.find().populate('items').populate('userId');
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
              const randomCollection = await Collection.find().populate('items').populate('userId');
              
              const randNum = Math.floor(Math.random() * randomCollection.length);
              console.log(randNum);
              console.log(randomCollection[randNum].userId.username);

             return randomCollection[randNum];
            } catch (error) {
                console.log(error);
              throw new Error('Error fetching random collection');
            }
        },
        items: async () => {
            const items = await Item.find();
            return items;
        },
        singleItem: async (parent, { itemId }) => {
            const item = await Item.findById(itemId );
            return item;
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
            
        const collection = await Collection.create({
            ...args,
            userId: context.user ? context.user._id : "655d1294b83a63f31771c154"
        })

        // ------------------------------------------------------------------------------------------------------------
        // --------------- CHANGE THE ID BELOW TO THE USER ID YOU ARE LOGGED INTO THAT YOU WANT TO TEST --------------- 
        // ------------------------------------------------------------------------------------------------------------
        await User.findOneAndUpdate(
            { _id: context.user ? context.user._id : "655d1294b83a63f31771c154" },
            { $addToSet: { collections: collection._id }},
            );
      
            return collection;
          },
        // addCollection: async (parent, args, context) => {
            
        // console.log('add collection?')
        
        
        // const collection = await Collection.create({
        //     ...args,
        //     userId: context.user ? context.user._id : "655d1294b83a63f31771c154"
        // })
        // console.log(collection);

        // // ------------------------------------------------------------------------------------------------------------
        // // --------------- CHANGE THE ID BELOW TO THE USER ID YOU ARE LOGGED INTO THAT YOU WANT TO TEST --------------- 
        // // ------------------------------------------------------------------------------------------------------------
        // await User.findOneAndUpdate(
        //     { _id: context.user ? context.user._id : "655d1294b83a63f31771c154" },
        //     { $addToSet: { collections: collection._id }},
        //     );
        //     // console.log(updateUser);
        //     //     if (!updateUser) {
        //         //         throw AuthenticationError;
        //         //     }
                

        //     return collection;    
        // },

        deleteCollection: async (parent, { collectionId }) => {
            try {
              console.log('In delete collection');
          
              // Find the collection to be deleted
              const deletedCollection = await Collection.findOneAndDelete({ _id: collectionId });
          
              if (!deletedCollection) {
                throw new Error("Collection not found for deletion");
              }
          
              // Update the user to remove the deleted collection
              const updatedUser = await User.findByIdAndUpdate(
                deletedCollection.userId,
                { $pull: { collections: collectionId } },
                { new: true }
              );
          
              console.log('Updated User:', updatedUser);
          
              return updatedUser;
            } catch (error) {
              console.error('Error deleting collection:', error);
              throw error; 
            }
          },
          
        editCollection: async (parent, args) => {
            const collection = Collection.findOneAndUpdate(
                { _id: args.collectionId },
                { ...args }
                )
            return collection;
        },

        addItem: async (parent, args, context) => {

            const item = await Item.create({...args})

            await Collection.findOneAndUpdate(
                { _id: args.collectionId },
                { $addToSet: { items: item._id}},
            )

            return item;
        },
        deleteItem: async (parent, {itemId}) => {
            return Item.findOneAndDelete({ _id: itemId })
        },
        editItem: async (parent, args) => {
            console.log('here?')
            const item = Item.findOneAndUpdate(
                { _id: args.itemId },
                { 
                    itemName: args.itemName,
                    itemDescription: args.itemDescription,
                    itemImage: args.itemImage,
                 }
                )
            return item;
        }
    }
}

module.exports = resolvers;