const { User, Collection, Item } = require("../models");
const models = require("../models");
const db = require("../config/connection");
const userData = require("./seedUser.json");
const collectionData = require("./seedCollection.json");
const itemData = require("./seedItems.json");

// Clear the database before seeding it
const cleanDB = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};

db.once("open", async () => {
  try {
    await cleanDB("Collection", "collections");

    await cleanDB("User", "users");

    await cleanDB("Item", "items");

    // Seed users
    const createdUsers = await User.create(userData);

    // Seed collections and items
    for (let i = 0; i < createdUsers.length; i++) {
      const currentUser = createdUsers[i];

      // Seed collection
      const createdCollection = await Collection.create({
        ...collectionData[i],
        userId: currentUser._id,
        items: [], // Initialize an empty array for items
      });

      // Seed item for the collection
      const createdItem = await Item.create({
        ...itemData[i],
        collectionId: createdCollection._id,
      });

        // Associate items with the collection
        createdCollection.items.push(createdItem._id);
        await createdCollection.save();

        // Associate the collection with the user
        currentUser.collections.push(createdCollection._id);
        await currentUser.save();
      }

      console.log("Data seeded successfully!");
      process.exit(0);
    
    } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
