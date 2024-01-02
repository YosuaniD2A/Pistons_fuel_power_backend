const { deleteImageModel } = require("../models/images.model");
const { getAllVariantsByProductID, deleteProductModel } = require("../models/products.model");
const { insertVariantModel, deleteVariantModel, getVariantModel, getAllVariantModel, getAllProductbyVariantsModel, getProductbyVariantIdModel, getAllImagesByVariantID, getVariantsByImageId, deleteRelationshipByVariantId, getImagesByvariantIdModel } = require("../models/variants.model");
const { login } = require("./auth.controller");


const addVariant = async (req, res) => {
    try {
        const [data] = await insertVariantModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variantId = req.params.id;

        // Obtener el producto asociado a la variante que se eliminará
        const [productId] = await getProductbyVariantIdModel(variantId);
        // Obtener las imágenes relacionadas con la variante que se eliminara
        const [variantImages] = await getAllImagesByVariantID(variantId);

        // Eliminar la variante
        const [data] = await deleteVariantModel(variantId);

         // Eliminar la relacion con imagenes asociada a esta variante
         for (const image of variantImages) {
            await deleteRelationshipByVariantId(variantId); 
        }

        // Verificar si el producto tiene más variantes
        const [remainingVariants] = await getAllVariantsByProductID(productId[0].id);

        if (remainingVariants.length === 0) {
            // Si no hay más variantes, eliminar el producto
            await deleteProductModel(productId[0].id);

            // Verificar si las imágenes ya no tienen más relaciones con variantes
            for (const image of variantImages) {
                const [imageVariants] = await getVariantsByImageId(image.images_id);
                if (imageVariants.length === 0) {
                    // Si no hay más relaciones, eliminar la imagen
                    await deleteImageModel(image.images_id);
                }
            }
        }

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getVariant = async (req, res) => {
    try {
        const [data] = await getVariantModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllVariants = async (req, res) => {
    try {
        const [data] = await getAllVariantModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//------------------------------------------------------------------------

const getAllProductbyVariants = async (req, res) => {
    try {
        const [data] = await getAllProductbyVariantsModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImagesByVariantId = async (req, res) => {
    try {
        const [data] = await getImagesByvariantIdModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    addVariant,
    deleteVariant,
    getVariant,
    getAllVariants,

    getAllProductbyVariants,
    getImagesByVariantId
};