const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertProductModel = ({title, description, type, price, category, sale, tags, collections_id, discounts_id}) => {
    return db.query("INSERT INTO products (title, description, type, price, category, sale, tags, collections_id, discounts_id) VALUES (?,?,?,?,?,?,?,?,?)", 
    [title, description, type, price, category, sale, tags, collections_id, discounts_id]); 
}

const updateProductModel = (id, {title, description, type, price, category, sale, tags, collections_id, discounts_id, updated_date}) => {
    return db.query("UPDATE products SET title = ?, description = ?, type = ?, price = ?, category = ?, sale = ?, tags = ?, collections_id = ?, discounts_id = ?, updated_date = ? WHERE id = ?", 
    [title, description, type, price, category, sale, tags, collections_id, discounts_id, updated_date, id]);
}

const deleteProductModel = (id) => {
    return db.query("DELETE FROM products WHERE id = ?", 
    [id]);
}

const getProductModel = (id) => {
    return db.query("SELECT * FROM products WHERE id = ?", 
    [id]);
}

const getAllProductsModel = () => {
    return db.query("SELECT * FROM products");
}

//--------------------------------------------------------

const getAllVariantsByProductID = (id) =>{
    return db.query("SELECT * FROM variants  WHERE products_id = ?", [id]);
}


module.exports = {
    insertProductModel,
    updateProductModel,
    deleteProductModel,
    getProductModel,
    getAllProductsModel,

    getAllVariantsByProductID
}