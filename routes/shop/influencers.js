const express = require("express");
const { login, getAllOrdersWithMyCode, getCodeDescount, getInfluencer, updateInfluencer } = require("../../controllers/influencers.controller");


const router = express.Router();

router.post("/login", login);

router.get("/getCodeDescount/:code", getCodeDescount) //Actualmente en desuso

router.get("/getInfluencer/:value", getInfluencer )

router.put("/updateInfluencer/:id", updateInfluencer)

router.get("/getAllOrdersWithMyCode/:code", getAllOrdersWithMyCode)



module.exports = router;