const { insertImageModel, updateImageModel, deleteImageModel, getImageModel, getAllImageModel, insertLinkImageModel, deleteLinkImageModel } = require("../models/images.model");


const addImage = async (req, res) => {
    try {
        const [data] = await insertImageModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateImage = async (req, res) => {
    try {
        const [data] = await updateImageModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        const [data] = await deleteImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImage = async (req, res) => {
    try {
        const [data] = await getImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllImages = async (req, res) => {
    try {
        const [data] = await getAllImageModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//----------------------------------------------------

const addLinkImage = async (req, res) => {
    try {
        const [data] = await insertLinkImageModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteLinkImage = async (req, res) => {
    try {
        const [data] = await deleteLinkImageModel(req.params.id);

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
    addImage,
    updateImage,
    deleteImage,
    getImage,
    getAllImages,

    addLinkImage,
    deleteLinkImage
};