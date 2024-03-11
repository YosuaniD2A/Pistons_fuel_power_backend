const express = require("express");
const { login, getAllOrdersWithMyCode, getCodeDescount, getInfluencer } = require("../../controllers/influencers.controller");


const router = express.Router();

router.post("/login", login);

router.get("/getCodeDescount/:code", getCodeDescount) //Actualmente en desuso

router.get("/getInfluencer/:value", getInfluencer )

router.get("/getAllOrdersWithMyCode/:code", getAllOrdersWithMyCode)


module.exports = router;