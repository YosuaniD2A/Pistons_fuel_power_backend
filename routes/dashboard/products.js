const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getFullProduct } = require("../../controllers/products.controller");

const router = express.Router();

/*---------------------- Products Endpoints -------------------------------------------------*/

router.post("/addProduct", addProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.get("/getProduct/:id", getProduct);

router.get("/getAllProducts", getAllProducts);

//---------------------------------------------------------

router.get("/getFullProduct/:id", getFullProduct);



module.exports = router;