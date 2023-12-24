const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    solidity_address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    manufacturer_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    productNumber: {
      type: Number,
      default: 0,
    },
    distributor_buy: {
      type: Boolean,
      default: false,
    },
    retailer_buy: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("save", async function () {
  const product = this;
  const lastProduct = await mongoose.models.Product.findOne(
    {},
    "productNumber"
  ).sort({ productNumber: -1 });

  const nextProductNumber =
    (lastProduct && lastProduct.productNumber) + 1 || 0 + 1;
  product.productNumber = nextProductNumber;
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
