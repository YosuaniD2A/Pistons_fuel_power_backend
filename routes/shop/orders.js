const express = require("express");
const { createOrder, getOrderByID, updateOrder, getByOrderId, getBySiteOrderId, getAllOrderID } = require("../../controllers/orders.controller");


const router = express.Router();

/*---------------------- Payments Endpoints -------------------------------------------------*/

router.post("/createOrder", createOrder);

router.get("/getOrder/:id", getOrderByID);

router.get("/getBySiteOrderId/:site_order_id", getBySiteOrderId);

router.get("/getByOrderId/:orderId", getByOrderId);

router.get("/getAllOrderId/", getAllOrderID);

// router.get("/getOrders", getAllOrders);

router.patch("/updateOrder/:id", updateOrder);


module.exports = router;