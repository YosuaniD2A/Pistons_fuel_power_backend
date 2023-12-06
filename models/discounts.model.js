const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertDiscountModel = ({percent, date_start, date_end}) => {
    return db.query("INSERT INTO discounts (percent, date_start, date_end) VALUES (?,?,?)", 
    [percent, date_start, date_end]); 
}

const updateDiscountModel = (id, {percent, date_start, date_end}) => {
    return db.query("UPDATE discounts SET percent = ?, date_start = ?, date_end = ? WHERE id = ?", 
    [percent, date_start, date_end, id]);
}

const deleteDiscountModel = (id) => {
    return db.query("DELETE FROM discounts WHERE id = ?", 
    [id]);
}

const getDiscountModel = (id) => {
    return db.query("SELECT * FROM discounts WHERE id = ?", 
    [id]);
}

const getAllDiscountModel = () => {
    return db.query("SELECT * FROM discounts");
}

module.exports = {
    insertDiscountModel,
    updateDiscountModel,
    deleteDiscountModel,
    getDiscountModel,
    getAllDiscountModel
}