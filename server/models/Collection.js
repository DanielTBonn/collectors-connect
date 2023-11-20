const { Schema, model } = require("mongoose");
const dateFormat = require('../../client/src/utils/dateFormat.cjs');

const itemSchema = new Schema(
  {
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  itemImage: {
    type: String,
  },
  itemTag: {
    type: String,
  },
  collectionId: {
    type: String,
    required: true,
  },
  itemComments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
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
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
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
