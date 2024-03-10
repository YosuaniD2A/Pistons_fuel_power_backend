const express = require("express");
const { register, getAllInfluencers, getInfluencer, updateInfluencer, deleteInfluencer, updateInfluencerStatus, getAllCodes, changeInfluencerStatus, changeInfluencerNotify, getAllPromotionalCodes, getAllDiscountCoupons, getAllUsedCodes } = require("../../controllers/influencers.controller");

const router = express.Router();


router.post("/register", register);

router.get("/getInfluencers", getAllInfluencers)

router.get("/getInfluencer/:value", getInfluencer)

router.put("/updateInfluencer/:id", updateInfluencer)

router.delete("/deleteInfluencer/:id", deleteInfluencer)

//------------------------------------------------------------

router.get("/changeInfluencerStatus/:id", changeInfluencerStatus)

router.get("/changeInfluencerNotify/:id", changeInfluencerNotify)

router.get("/getAllPromotionalCodes", getAllPromotionalCodes)

router.get("/getAllDiscountCoupons", getAllDiscountCoupons)

router.get("/getAllUsedCodes", getAllUsedCodes)


module.exports = router;