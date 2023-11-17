const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        tag: {
            type: String,
        }

    }
);

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tag: {
        type: String,
    },
    image: {
        type: String,
    },
    items: [itemSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a collection, we'll also get another field called 'itemCount' with the number of items in the collection
collectionSchema.virtual('itemCount').get(function () {
    return this.items.length;
  });

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
