const express = require("express");
const { login, getAllOrdersWithMyCode, getCodeDescount, getInfluencer, updateInfluencer, getOrdersXMonthAgo } = require("../../controllers/influencers.controller");


const router = express.Router();

router.post("/login", login);

router.get("/getCodeDescount/:code", getCodeDescount) //Actualmente en desuso

router.get("/getInfluencer/:value", getInfluencer)

router.put("/updateInfluencer/:id", updateInfluencer)

router.get("/getAllOrdersWithMyCode/:code", getAllOrdersWithMyCode)

router.get("/getOrdersXMonthAgo/:monthsAgo/:code", getOrdersXMonthAgo)




module.exports = router;