const express = require("express");
const {
  getAllretProducts,
  getAllretbuyProducts,
  changeRetBuy,
  getAllretbuy,
} = require("../controller/productcontroller");

const router = express.Router();
router.get("/getAllRetProduct", getAllretProducts);
router.get("/getAllRetBuy", getAllretbuy);
router.get("/buyretproducts", getAllretbuyProducts);
router.put("/updateretBuy", changeRetBuy);
module.exports = router;
