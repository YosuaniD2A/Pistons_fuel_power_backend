const express = require("express");
const { getAllRequests, updateRequestById } = require("../../controllers/requests.controller");


const router = express.Router();


router.get("/getAllRequests/", getAllRequests)

router.put("/updateRequestById/:id", updateRequestById)



module.exports = router;