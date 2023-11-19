const { User, Collection } = require('../models');
const models = require('../models');
const db = require('../config/connection');
const userData = require('./seedUser.json');
const collectionData = require('./seedCollection.json');

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

    await User.create(userData);

    // await Collection.create(collectionData);
    for (let i = 0; i < collectionData.length; i++) {
      const { _id, username } = await Collection.create(collectionData[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { collections: _id }},
      );
    };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Users and Collections seeded successfully!');
  process.exit(0);
})