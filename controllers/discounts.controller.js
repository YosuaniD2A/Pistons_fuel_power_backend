const { insertDiscountModel, deleteDiscountModel, getDiscountModel, getAllDiscountModel, updateDiscountModel } = require("../models/discounts.model");


const addDiscount = async (req, res) => {
    try {
        const [data] = await insertDiscountModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateDiscount = async (req, res) => {
    try {
        const [data] = await updateDiscountModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const [data] = await deleteDiscountModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getDiscount = async (req, res) => {
    try {
        const [data] = await getDiscountModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllDiscounts = async (req, res) => {
    try {
        const [data] = await getAllDiscountModel();

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
    addDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscount,
    getAllDiscounts
  };