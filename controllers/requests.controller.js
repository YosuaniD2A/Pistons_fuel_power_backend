const { createRequestModel, getAllRequestsModel, getRequestsByInfluencerIdModel, updateRequestByIdModel, getAllRequestsRequestedModel } = require("../models/requests.model");

const createRequest = async (req, res) => {
    try {
        const [data] = await createRequestModel(req.body);

        res.send({
           data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getAllRequests = async (req, res) => {
    try {
        const [data] = await getAllRequestsModel();

        res.send({
           data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getAllRequestsRequested = async (req, res) => {
    try {
        const [data] = await getAllRequestsRequestedModel();

        res.send({
           data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getRequestsByInfluencerId = async (req, res) => {
    try {
        const [data] = await getRequestsByInfluencerIdModel(req.params.id);

        res.send({
           data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const updateRequestById = async (req, res) => {
    try {
        const [data] = await updateRequestByIdModel(req.params.id, req.body);

        res.send({
           data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    createRequest,
    getAllRequests,
    getRequestsByInfluencerId,
    updateRequestById,
    getAllRequestsRequested
}