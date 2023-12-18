const { getCollectionModel } = require("../models/collections.model");
const { getDiscountModel } = require("../models/discounts.model");
const { insertProductModel, updateProductModel, deleteProductModel, getProductModel, getAllProductsModel, getAllVariantsByProductID } = require("../models/products.model");
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
        const [data] = await getAllProductsModel();
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

const getAllFullProducts = async (req, res) => {
    try {
        const [allProducts] = await getAllProductsModel(); // Cambia el nombre según tu modelo
        
        const productDetails = await Promise.all(allProducts.map(async (product) => {
            product.category = product.category;
            product.sale = product.sale ? true : false;
            product.tags = product.tags.split(',');
            const [collection] = await getCollectionModel(product.collections_id);
            product.collection = [collection[0].name];
            delete product.collections_id;
            const [discount] = await getDiscountModel(product.discounts_id);
            product.discount = discount[0].percent;
            delete product.discounts_id;
            const [variantsData] = await getAllVariantsByProductID(product.id);
            product.variants = variantsData;
            const [images] = await getAllImagesByVariantID(variantsData[0].id);
            product.images = images;

            return product
        }));

        res.send({
            data: productDetails
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

    getFullProduct,
    getAllFullProducts
};