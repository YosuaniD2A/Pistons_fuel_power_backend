const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const createOrderModel = (data) => {
    return db.query(
        `INSERT INTO orders 
        (
            site_name,
	        site_order_id,
            order_id,
	        buyer,
	        phone,
	        sku,
	        order_date,
	        order_total,
	        proportional,
	        quantity,
	        price,
	        title,
	        shipping_status,
	        street_1,
	        shipping_city,
	        shipping_postal_code,
	        shipping_state_province,
	        shipping_country,
	        tracking_number,
	        carrier,
	        service_code,
	        payment_id,
	        payment_date,
            promotional_code) VALUES 
            (?,?,?,?,?,?,NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?)`,
            [data.site_name, data.site_order_id, data.order_id, data.buyer, data.phone, data.sku, data.order_total, data.proportional, 
            data.quantity, data.price, data.title, data.shipping_status, data.street_1, data.shipping_city, data.shipping_postal_code, 
            data.shipping_state_province, data.shipping_country, data.tracking_number, data.carrier, data.service_code, 
            data.payment_id, data.promotional_code]);
}

const getOrderModel = (id) => {
    return db.query("SELECT * FROM orders WHERE id = ?", 
    [id]);
}

const getBySiteOrderIdModel = (site_order_id) => {
    return db.query("SELECT * FROM orders WHERE site_order_id = ?", 
    [site_order_id]);
}

const getByOrderIdModel = (orderId) => {
    return db.query("SELECT * FROM orders WHERE order_id = ?", 
    [orderId]);
}

const getByPromotionalCodeModel = (code) => {
    return db.query("SELECT * FROM orders WHERE promotional_code = ?", 
    [code]);
}

const updateOrderModel = (data, id) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE orders SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

const getAllOrderIDModel = (orderId) => {
    return db.query("SELECT order_id FROM orders GROUP BY order_id", 
    [orderId]);
}

module.exports = {
    createOrderModel,
    getOrderModel,
    updateOrderModel,
    getBySiteOrderIdModel,
    getByOrderIdModel,
    getAllOrderIDModel,

    getByPromotionalCodeModel
}