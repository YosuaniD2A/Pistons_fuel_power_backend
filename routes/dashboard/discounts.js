const express = require("express");
const { addDiscount, deleteDiscount, getDiscount, getAllDiscounts, updateDiscount } = require("../../controllers/discounts.controller");

const router = express.Router();

/*---------------------- Discounts Endpoints -------------------------------------------------*/

router.post("/addDiscount", addDiscount);

router.put("/updateDiscount/:id", updateDiscount);

router.delete("/deleteDiscount/:id", deleteDiscount);

router.get("/getDiscount/:id", getDiscount);

router.get("/getAllDiscounts", getAllDiscounts);

module.exports = router;