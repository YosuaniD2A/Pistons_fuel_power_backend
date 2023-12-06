const express = require("express");
const { addImage, deleteImage, getImage, getAllImages, updateImage, addLinkImage, deleteLinkImage } = require("../../controllers/images.controller");


const router = express.Router();

/*---------------------- Images Endpoints -------------------------------------------------*/

router.post("/addImage", addImage);

router.put("/updateImage/:id", updateImage);

router.delete("/deleteImage/:id", deleteImage);

router.get("/getImage/:id", getImage);

router.get("/getAllImages", getAllImages);

// ---------------------------------------------

router.post("/addLinkImage", addLinkImage);

router.delete("/deleteLinkImage/:id", deleteLinkImage);


module.exports = router;