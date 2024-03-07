const express = require("express");
const { login, getAllOrdersWithMyCode, getCodeDescount } = require("../../controllers/influencers.controller");


const router = express.Router();

router.post("/login", login);

// router.get("/getCode/:code", getCode);

router.get("/getCodeDescount/:code", getCodeDescount)

router.get("/getAllOrdersWithMyCode/:code", getAllOrdersWithMyCode)


module.exports = router;