const express = require("express");
const { sendMailer } = require("../../controllers/sendMailer.controller");


const router = express.Router();


router.post("/sendMailer/", sendMailer)



module.exports = router;