const express = require("express");

const errorHandler = require("../server/middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const locationRoutes = require("./routes/locationRoute");

connectDb(); //calls from config/dbConnection file

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/administrators", require("./routes/administratorRoutes"));
app.use("/api/executives", require("./routes/executiveRoutes"));
//QRGeneratorBoys
app.use("/api/qrGeneraterBoy", require("./routes/deliveryBoysRoutes"));
app.use("/api/forgetPassword", require("./routes/authRoutes"));
app.use("/api/resetPassword", require("./routes/authRoutes"));

app.use("/api/category", require("./routes/categoryRouter"));

app.use("/api/items", require("./routes/itemRouter"));

app.use("/api/purchase", require("./routes/purchaseRouter"));

app.use("/api/supplier", require("./routes/supplierRouter"));
app.use("/api/itemStocks", require("./routes/itemStocksRouter"));
// product
app.use("/api/product", require("./routes/productRouter"));

app.use("/api/productStock", require("./routes/productStockRoutes"));

app.use("/api/seller", require("./routes/sellerRouter"));
app.use("/api/supplies", require("./routes/suppliesRouter"));

app.use("/api/order", require("./routes/orderRouter"));

app.use("/api", require("./routes/countryStateCitiesRouter"));

app.use("/api/sales", require("./routes/salesRouter"));

app.use("/api", require("./routes/adminSalesRouter"));

// SuperStockist Signup

app.use("/api/superstockist", require("./routes/superStockistSignupRoutes"));
app.use(
  "/api/superStockistDetails",
  require("./routes/superStockistDetailsRoutes")
);
app.use(
  "/api/superStockistProductDetails",
  require("./routes/superStockistProductDetailsRoutes")
);

//Stockist order
app.use("/api/stockist/order", require("./routes/stockistRouters"));

//panShop Order
app.use("/api/panshop/order", require("./routes/panShopRoutes"));

app.use("/api/sos", require("./routes/sosRoutes"));

app.use("/api/sosAlert", require("./routes/SosAlertRouters"));

app.use("/api/location", locationRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running port no ${port}`);
});
