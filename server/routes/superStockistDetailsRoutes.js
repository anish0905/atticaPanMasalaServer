const express = require("express");
const router = express.Router();
const {
  getSuperStockistDetails,
  createSuperStockistDetail,
  getSuperStockistDetail,
  updateSuperStockistDetail,
  deleteSuperStockistDetail,
} = require("../controllers/superStockistDetailsController");
// const superStockistValidateToken = require("../middleware/superStockistValidateTokenHandler"); // Authentication middleware

// // Apply authentication middleware to all routes
// // router.use(superStockistValidateToken);

// const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

// router.use(executiveValidateToken);

// Define routes for CRUD operations on Super Stockist Details
router.route("/").get(getSuperStockistDetails); // Get all details for the current user
router.route("/").post(createSuperStockistDetail); // Create a new super stockist detail
router.route("/:id").get(getSuperStockistDetail); // Get a specific super stockist detail by ID
router.route("/:id").put(updateSuperStockistDetail); // Update a specific super stockist detail
router.route("/:id").delete(deleteSuperStockistDetail); // Delete a specific super stockist detail

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const {
//   getSuperStockistDetails,
//   createSuperStockistDetail,
//   getSuperStockistDetail,
//   updateSuperStockistDetail,
//   deleteSuperStockistDetail,
// } = require("../controllers/superStockistDetailsController");

// const superStockistValidateToken = require("../middleware/superStockistValidateTokenHandler"); // Middleware for super stockists
// const executiveValidateToken = require("../middleware/executiveValidateTokenHandler"); // Middleware for executives

// // Define routes for CRUD operations on Super Stockist Details with appropriate middleware

// // Apply `executiveValidateToken` to the GET request
// router.route("/")
//   .get(executiveValidateToken, getSuperStockistDetails); // Get all details, requires executive validation

// // Apply `superStockistValidateToken` to the POST request
// router.route("/")
//   .post(superStockistValidateToken, createSuperStockistDetail); // Create new super stockist detail, requires super stockist validation

// // The following routes don't have specific middleware, consider adding if needed
// router.route("/:id")
//   .get(getSuperStockistDetail) // Get a specific super stockist detail by ID
//   .put(superStockistValidateToken, updateSuperStockistDetail) // Update a specific super stockist detail, requires super stockist validation
//   .delete(superStockistValidateToken, deleteSuperStockistDetail); // Delete a specific super stockist detail, requires super stockist validation

// module.exports = router;
