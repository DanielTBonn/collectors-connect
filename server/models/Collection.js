const { Schema, Types, model } = require("mongoose");
const dateFormat = require("../../client/src/utils/dateFormat.cjs");


const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    //Owner of collection, reference to User model
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a collection, we'll also get another field called 'itemCount' with the number of items in the collection
collectionSchema.virtual("itemCount").get(function () {
  return this.items.length;
});

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
