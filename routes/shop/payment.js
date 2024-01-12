const express = require("express");
const { createSession, retrieveSession } = require("../../controllers/payment.controller");

const router = express.Router();

/*---------------------- Payments Endpoints -------------------------------------------------*/

router.post("/create-checkout-session", createSession);

router.get("/retrieve-checkout-session/:id", retrieveSession);

router.get("/success", (req, res) => res.send("Success"));

router.get("/cancel", (req, res) => res.send("Canceled"));


module.exports = router;