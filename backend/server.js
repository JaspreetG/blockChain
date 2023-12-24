const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/productRoute.js");
const distproductRoute = require("./routes/distproductRoute.js");
const retproductRoute = require("./routes/retproductRoute.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

app.use(cors());

app.use(express.json());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/products", productRoute);
app.use("/api/distproducts", distproductRoute);
app.use("/api/retproducts", retproductRoute);
app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
