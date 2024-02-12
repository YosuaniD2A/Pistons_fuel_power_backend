const { createOrderModel, getOrderModel, updateOrderModel, getBySiteOrderIdModel, getByOrderIdModel, getAllOrderIDModel } = require("../models/orders.model");

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

const getBySiteOrderId = async (req, res) => {
    try {
        const [data] = await getBySiteOrderIdModel(req.params.site_order_id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getByOrderId = async (req, res) => {
    try {
        const [data] = await getByOrderIdModel(req.params.orderId);
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
        const [data] = await updateOrderModel(req.body, req.params.id);
        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllOrderID = async (req, res) => {
    try {

        const [data] = await getAllOrderIDModel();
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
    createOrder,
    getOrderByID,
    updateOrder,
    getBySiteOrderId,
    getByOrderId,

    getAllOrderID
};