const express = require("express");
const { addCollection, updateCollection, deleteCollection, getCollection, getAllCollections, getAllMyProducts, getAllMyVariantsProducts } = require("../../controllers/collections.controller");

const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/addCollection", addCollection);

router.put("/updateCollection/:id", updateCollection);

router.delete("/deleteCollection/:id", deleteCollection);

router.get("/getCollection/:id", getCollection);

router.get("/getAllCollections", getAllCollections);


//------------------------------------------------------------------------------------------------

router.get("/getAllMyProducts/:id", getAllMyVariantsProducts)


module.exports = router;