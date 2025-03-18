// schema Brand
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    brandId: String,
    brand: String,
  },
  { collection: "Categories" }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
