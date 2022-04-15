const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
