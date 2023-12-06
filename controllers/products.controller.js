const { insertProductModel, updateProductModel, deleteProductModel, getProductModel, getAllProductModel, getAllVariantsByProductID } = require("../models/products.model");
const { getAllImagesByVariantID } = require("../models/variants.model");


const addProduct = async (req, res) => {
    try {
        const [data] = await insertProductModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const [data] = await updateProductModel(req.params.id, req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const [data] = await deleteProductModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const [data] = await getProductModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const [data] = await getAllProductModel();
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//--------------------------------------------------------------------

const getFullProduct = async (req, res) => {
    try {
        const [generalData] = await getProductModel(req.params.id);
        console.log(generalData);
        const [variantsData] = await getAllVariantsByProductID(req.params.id);
        console.log(variantsData);
        const [imagesData] = await getAllImagesByVariantID(variantsData[0].id);
        console.log(imagesData);

        res.send({
            data: {
                general: generalData[0],
                variants: variantsData,
                images: imagesData
            }
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,

    getFullProduct
};