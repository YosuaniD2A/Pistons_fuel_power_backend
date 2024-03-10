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

const getByPromotionalCodeByMonthsModel = (code) => {
    return db.query(
        `SELECT 
            months.month AS month,
            IFNULL(COUNT(orders.id), 0) AS order_count
        FROM 
        (
            SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
            SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
            SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
            SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
        ) AS months
        LEFT JOIN 
        orders ON MONTH(orders.order_date) = months.month
            AND orders.shipping_status NOT IN ('cancelled', 'refused')
            AND orders.promotional_code = ?
        GROUP BY 
        months.month;`,
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

    getByPromotionalCodeModel,
    getByPromotionalCodeByMonthsModel
}