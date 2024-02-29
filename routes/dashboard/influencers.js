const express = require("express");
const { register, getAllInfluencers, getInfluencer, updateInfluencer, deleteInfluencer, updateInfluencerStatus, getAllCodes, changeInfluencerStatus } = require("../../controllers/influencers.controller");

const router = express.Router();


router.post("/register", register);

router.get("/getInfluencers", getAllInfluencers)

router.get("/getInfluencer/:value", getInfluencer)

router.put("/updateInfluencer/:id", updateInfluencer)

router.delete("/deleteInfluencer/:id", deleteInfluencer)

//------------------------------------------------------------

router.get("/changeInfluencerStatus/:id", changeInfluencerStatus)

router.get("/getAllCodes", getAllCodes)


module.exports = router;