const express = require("express");
const router = express.Router();
const {
  registerQrGeneraterBoy,
  loginUser,
  currentUser,
  getAllDeliveryBoyDeatils,
  updatePassword,
} = require("../controllers/deliveryBoyController");
const validateToken = require("../middleware/qrGeneraterBoyValidateTokenHandler");

// Register
router.post("/register", registerQrGeneraterBoy);

//Login
router.post("/login", loginUser);

// Current user information
router.get("/current", validateToken, currentUser);
router.get("/allDetailsDeliverBoy", getAllDeliveryBoyDeatils);
router.put("/update-password/:id", updatePassword);

module.exports = router;
