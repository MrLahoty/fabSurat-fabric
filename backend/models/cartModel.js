const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      size: {
        type: String,
        required: function () {
          return this.category === "Readymade";
        },
      },
      price: {
        type: Number, // Add a price field to store the price of the product
        required: true,
      },
    },
  ],
});

// Virtual property to get formatted price for products in the cart
cartSchema.virtual("formattedProducts").get(function () {
  return this.products.map((item) => ({
    ...item,
    formattedPrice: parseFloat(item.price).toFixed(2), // Format the price
  }));
});

module.exports = mongoose.model("Cart", cartSchema);
