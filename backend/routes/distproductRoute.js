const express = require("express");
const {
  getAlldistProducts,
  changeDistBuy,
  getAllbuyProducts,
} = require("../controller/productcontroller");

const router = express.Router();
router.get("/getAllDistProduct", getAlldistProducts);
router.get("/buyproducts", getAllbuyProducts);
router.put("/updateDistBuy", changeDistBuy);
module.exports = router;
