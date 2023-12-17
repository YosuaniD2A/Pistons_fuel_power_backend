const express = require("express");
const { getAllFullProducts } = require("../../controllers/products.controller");

const router = express.Router();

/*---------------------- Products Endpoints -------------------------------------------------*/

router.get("/getAllFullProducts", getAllFullProducts);

module.exports = router;