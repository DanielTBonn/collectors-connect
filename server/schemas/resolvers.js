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
                return await User.findOne({ _id: context.user._id })
            }            
            throw new AuthenticationError('You need to be logged in!');
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
            console.log(parent);
            // console.log(args.username);

            console.log(mongoose.Types.ObjectId.isValid('6552f78058a084dbcde2edde'));
// true
            console.log(mongoose.Types.ObjectId.isValid('whatever'));

                const collection = await Collection.create({...args})
                console.log(collection);
                await User.findOneAndUpdate(
                    { _id: "6552f78058a084dbcde2edde" },
                    { $addToSet: { collections: collection._id }},
                    );
                // console.log(updateUser);
                //     if (!updateUser) {
                //         throw AuthenticationError;
                //     }

                    return collection;

        }

    }
}

module.exports = resolvers;