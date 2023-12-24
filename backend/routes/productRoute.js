const express = require("express");
const {
    Createproduct,
    getAllProducts,
    getProductBySolidityAddress,
    getAlldistProducts,
    changeDistBuy,
} = require("../controller/productcontroller");

const router = express.Router();
router.get("/", getAllProducts);
router.post("/", Createproduct);
router.get("/:solidity_address", getProductBySolidityAddress);
// router.get("/getAllDistProduct", getAlldistProducts);
// router.put("/updateDistBuy", changeDistBuy);
module.exports = router;
