const express = require("express");
const { getAllCollections } = require("../../controllers/collections.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.get("/getAllCollections", getAllCollections);

module.exports = router;