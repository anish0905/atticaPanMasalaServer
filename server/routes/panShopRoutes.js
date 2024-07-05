const express = require("express");
const {
    createPanShopOrder,
    getPanShopOrderById,
    updateEmail,
    getPanShopOrder,
    // getTodays24HoursSell
    deletePanShopOrderById
} = require("../controllers/panShopOrderController");

const router = express.Router();

router.route("/")
    .post(createPanShopOrder)
    .get(getPanShopOrder);

router.route("/:id")
    .get(getPanShopOrderById)
    .patch(updateEmail)
    .delete(deletePanShopOrderById)


module.exports = router;
