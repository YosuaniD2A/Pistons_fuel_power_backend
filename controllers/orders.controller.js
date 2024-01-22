const { createOrderModel, getOrderModel } = require("../models/orders.model");

const createOrder = async (req, res) => {
    try {
        const [data] = await createOrderModel(req.body);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getOrderByID = async (req, res) => {
    try {
        const [data] = await getOrderModel(req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateOrder = async (req, res) => {
    try {
        

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrders = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    createOrder,
    getOrderByID,
    updateOrder,

    getAllOrders
};