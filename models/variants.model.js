const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertVariantModel = ({ color, size, sku, products_id }) => {
    return db.query("INSERT INTO variants (color, size, sku, products_id) VALUES (?,?,?,?)",
        [color, size, sku, products_id]);
}

const deleteVariantModel = (id) => {
    return db.query("DELETE FROM variants WHERE id = ?",
        [id]);
}

const getVariantModel = (id) => {
    return db.query("SELECT * FROM variants WHERE id = ?",
        [id]);
}

const getAllVariantModel = () => {
    return db.query("SELECT * FROM variants");
}

//----------------------------------------------------------------------------------

const getAllImagesByVariantID = (variants_id) => {
    return db.query("SELECT * FROM images i JOIN variants_has_images vi ON vi.images_id = i.id WHERE vi.variants_id = ?", [variants_id]);
}

const getAllProductbyVariantsModel = () => {
    return db.query(`
    SELECT
        p.id AS productId,
        v.id AS variantId,
        p.title,
        p.sale,
        p.description,
        c.name AS collection,
        p.price,
        p.type,
	    v.size, v.color, v.sku,
        GROUP_CONCAT(DISTINCT i.img_url) AS imagesUrl
    FROM variants v
    JOIN products p ON v.products_id = p.id
    JOIN collections c ON p.collections_id = c.id
    JOIN variants_has_images vi ON vi.variants_id = v.id
    JOIN images i ON i.id = vi.images_id
    GROUP BY v.id, p.id, p.title, p.description, p.sale, c.name, p.price, p.type, v.size, v.color, v.sku;
    `)
}

const getProductbyVariantIdModel = (id) => {
    return db.query(`
    SELECT p.id
        FROM variants v
        JOIN products p ON v.products_id = p.id
        WHERE v.id = ?;
    `, [id])
}

const getVariantsByImageId = (id) => {
    return db.query(`
    SELECT v.*
        FROM variants v
        JOIN variants_has_images vi ON v.id = vi.variants_id
        WHERE vi.images_id = ?;
    `, [id])
}

const getImagesByvariantIdModel = (id) => {
    return db.query(`
    SELECT vi.images_id FROM variants_has_images vi WHERE vi.variants_id = ?;`, [id])
}

const deleteRelationshipByVariantId = (id) => {
    return db.query("DELETE FROM variants_has_images WHERE variants_id = ? LIMIT 1",
        [id]);
}



module.exports = {
    insertVariantModel,
    deleteVariantModel,
    getVariantModel,
    getAllVariantModel,

    getAllImagesByVariantID,
    getAllProductbyVariantsModel,
    getProductbyVariantIdModel,
    getVariantsByImageId,
    deleteRelationshipByVariantId,
    getImagesByvariantIdModel
}