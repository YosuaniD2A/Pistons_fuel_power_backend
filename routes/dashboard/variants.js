const express = require("express");
const { addVariant, deleteVariant, getVariant, getAllVariants, getAllProductbyVariants, getImagesByVariantId } = require("../../controllers/variants.controller");

const router = express.Router();

/*---------------------- Variants Endpoints -------------------------------------------------*/

router.post("/addVariant", addVariant);

router.delete("/deleteVariant/:id", deleteVariant);

router.get("/getVariant/:id", getVariant);

router.get("/getAllVariants", getAllVariants);

/*----------------------------------------------------------------------*/

router.get("/getAllProductbyVariants", getAllProductbyVariants);

router.get("/getImagesByVariantId/:id", getImagesByVariantId);

module.exports = router;