const express = require("express");
const { createOrder, getOrderByID, updateOrder } = require("../../controllers/orders.controller");


const router = express.Router();

/*---------------------- Payments Endpoints -------------------------------------------------*/

router.post("/createOrder", createOrder);

router.get("/getOrder/:id", getOrderByID);

// router.get("/getOrders", getAllOrders);

router.patch("/updateOrder/:id", updateOrder);


module.exports = router;