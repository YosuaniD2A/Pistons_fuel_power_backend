const { insertImageGalleryModel, updateImageGalleryModel, deleteImageGalleryModel, getImageGalleryModel, getAllImageGalleryModel } = require("../models/gallery.model");


const addImageGallery = async (req, res) => {
    try {
        const [data] = await insertImageGalleryModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateImageGallery = async (req, res) => {
    try {
        const [data] = await updateImageGalleryModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteImageGallery = async (req, res) => {
    try {
        const [data] = await deleteImageGalleryModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImageGallery = async (req, res) => {
    try {
        const [data] = await getImageGalleryModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllImagesGallery = async (req, res) => {
    try {
        const [data] = await getAllImageGalleryModel();

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
    addImageGallery,
    updateImageGallery,
    deleteImageGallery,
    getImageGallery,
    getAllImagesGallery

};