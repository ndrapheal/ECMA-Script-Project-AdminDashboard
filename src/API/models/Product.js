const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    specs: {
      processor: { type: String, required: true },
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      display: { type: String, required: true },
    },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    inStock: { type: Boolean, required: true },
    releaseDate: { type: Date, required: true },
  },
  { collection: "Products" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
