const express = require("express");
const { uploadProductsImages, uploadGalleryImages } = require("../../controllers/uploadAWS.controller");


const router = express.Router();


router.post("/uploadProductsImages/", uploadProductsImages)

router.post("/uploadGalleryImages/", uploadGalleryImages)



module.exports = router;