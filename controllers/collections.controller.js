const { insertCollectionModel, updateCollectionModel, deleteCollectionModel, getCollectionModel, getAllCollectionModel, getAllMyProductsModel, getAllMyVariantsProductsModel } = require("../models/collections.model");


const addCollection = async (req, res) => {
    try {
        console.log(req.body);
        const [data] = await insertCollectionModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateCollection = async (req, res) => {
    try {
        const [data] = await updateCollectionModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteCollection = async (req, res) => {
    try {
        const [data] = await deleteCollectionModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getCollection = async (req, res) => {
    try {
        const [data] = await getCollectionModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllCollections = async (req, res) => {
    try {
        const [data] = await getAllCollectionModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//------------------------------------------------------------------------------------

const getAllMyVariantsProducts = async (req, res) => {
    try {
        const [data] = await getAllMyVariantsProductsModel(req.params.id);

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
    addCollection,
    updateCollection,
    deleteCollection,
    getCollection,
    getAllCollections,

    getAllMyVariantsProducts
};