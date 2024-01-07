const express = require("express");
const { getAllImagesGallery } = require("../../controllers/gallery.controller");

const router = express.Router();

/*---------------------- Images Endpoints -------------------------------------------------*/

router.get("/getAllImages", getAllImagesGallery);



module.exports = router;