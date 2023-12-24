const Product = require("../model/product.js");

const Createproduct = async (req, res) => {
  try {
    const {
      solidity_address,
      name,
      category,
      price,
      manufacturer_name,
      address,
    } = req.body;
    const new_solidity_address = solidity_address.toLowerCase();
    // Check if product already exists
    // const existingProduct = await Product.findOne({ solidity_address });
    // if (existingProduct) {
    //     return res.status(400).json({ message: "Product already exists" });
    // }
    console.log(new_solidity_address);
    // Create a new product
    const newProduct = new Product({
      solidity_address: new_solidity_address,
      name,
      category,
      price,
      manufacturer_name,
      address,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({ product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductBySolidityAddress = async (req, res) => {
  const { solidity_address } = req.params;

  try {
    const product = await Product.find({ solidity_address: solidity_address });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAlldistProducts = async (req, res) => {
  console.log("hello dhuria");
  try {
    const product = await Product.find({ distributor_buy: true });
    console.log(product);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllbuyProducts = async (req, res) => {
  try {
    const product = await Product.find({ distributor_buy: false });
    console.log(product);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const changeDistBuy = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productNumber: req.body.productNumber },
      { $set: { distributor_buy: true } },
      { returnOriginal: false }
    );

    console.log("Product updated:", updatedProduct);
    // Additional logic or response handling
  } catch (error) {
    console.error("Error updating product:", error);
    // Handle the error or send an appropriate response
  }
};

const getAllretProducts = async (req, res) => {
  console.log("hello dhuria");
  try {
    const product = await Product.find({
      distributor_buy: true,
      retailer_buy: false,
    });
    console.log(product);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllretbuyProducts = async (req, res) => {
  console.log("hello dhuria");
  try {
    const product = await Product.find({ retailer_buy: false });
    console.log(product);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllretbuy = async (req, res) => {
  console.log("hello dhuria");
  try {
    const product = await Product.find({ retailer_buy: true });
    console.log(product);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const changeRetBuy = async (req, res) => {
  try {
    console.log(req.body.productNumber);
    const product = await Product.find({ retailer_buy: false });
    console.log(product);
    const updatedProduct = await Product.findOneAndUpdate(
      { productNumber: req.body.productNumber },
      { $set: { retailer_buy: true } },
      { returnOriginal: false }
    );

    console.log("Product updated:", updatedProduct);
    // Additional logic or response handling
  } catch (error) {
    console.error("Error updating product:", error);
    // Handle the error or send an appropriate response
  }
};
module.exports = {
  Createproduct,
  getAllProducts,
  getProductBySolidityAddress,
  getAlldistProducts,
  changeDistBuy,
  getAllbuyProducts,
  getAllretProducts,
  getAllretbuyProducts,
  changeRetBuy,
  getAllretbuy,
};
