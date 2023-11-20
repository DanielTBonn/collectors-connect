const { User, Collection } = require('../models');
const models = require('../models');
const db = require('../config/connection');
const userData = require('./seedUser.json');
const collectionData = require('./seedCollection.json');
const itemData = require('./seedItems.json');

// Clear the database before seeding it
const cleanDB = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}

db.once('open', async () => {
  try {
    await cleanDB('Collection', 'collections');

    await cleanDB('User', 'users');

    const createdUsers = await User.create(userData);

    
    for (let i = 0; i < createdUsers.length; i++) {
      const currentUser = createdUsers[i];
      // Create a collection for the current user
      const createdCollection = await Collection.create({
        ...collectionData[i],
        userId: currentUser._id, // Associate the collection with the current user
        items: [], // Initialize an empty array for items
      });
      // Add an item from seed items array to collection
      await Collection.findOneAndUpdate(
        createdCollection._id,
        {
          $addToSet: {
            items: {
              ...itemData[i],
              collectionId: createdCollection._id,
            },
          },
        },
      );
      // Add the collection to the user's collections array
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $addToSet: {
            collections: createdCollection._id,
          },
        },
        { new: true }
      );
    };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Data seeded successfully!');
  process.exit(0);
})