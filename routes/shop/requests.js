const express = require("express");
const { createRequest, getRequestsByInfluencerId } = require("../../controllers/requests.controller");


const router = express.Router();


router.post("/createRequest/", createRequest)

router.get("/getRequestsByInfluencerId/:id", getRequestsByInfluencerId)



module.exports = router;