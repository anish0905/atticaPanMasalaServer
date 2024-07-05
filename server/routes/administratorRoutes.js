const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  updatePassword,
  getAllAdministrators,
} = require("../controllers/administratorController");
const validateToken = require("../middleware/validateTokenHandler");

// Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//update password
router.put("/update-password/:id", updatePassword);

//get all users
router.get("/users", getAllAdministrators);

// Current user information

router.get("/current", validateToken, currentUser);

module.exports = router;