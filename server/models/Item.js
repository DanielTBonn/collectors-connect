const { Schema, model } = require("mongoose");

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
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
      },
});

const Item = model("Item", itemSchema);

module.exports = Item;
