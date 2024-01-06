const express = require("express");
const { addImageGallery, updateImageGallery, deleteImageGallery, getImageGallery, getAllImagesGallery } = require("../../controllers/gallery.controller");

const router = express.Router();

/*---------------------- Images Endpoints -------------------------------------------------*/

router.post("/addImage", addImageGallery);

router.put("/updateImage/:id", updateImageGallery);

router.delete("/deleteImage/:id", deleteImageGallery);

router.get("/getImage/:id", getImageGallery);

router.get("/getAllImages", getAllImagesGallery);



module.exports = router;