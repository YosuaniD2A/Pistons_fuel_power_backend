const express = require("express");
const { getAllRequests, updateRequestById, getAllRequestsRequested } = require("../../controllers/requests.controller");


const router = express.Router();


router.get("/getAllRequests/", getAllRequests)

router.get("/getAllRequestsRequested/", getAllRequestsRequested)

router.put("/updateRequestById/:id", updateRequestById)



module.exports = router;