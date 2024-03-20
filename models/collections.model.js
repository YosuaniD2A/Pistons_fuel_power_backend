const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertCollectionModel = ({name, description, img_url}) => {
    return db.query("INSERT INTO collections (name, description, img_url) VALUES (?,?,?)", 
    [name, description, img_url]); 
}

const updateCollectionModel = (id, {name, description, img_url}) => {
    return db.query("UPDATE collections SET name = ?, description = ?, img_url = ? WHERE id = ?", 
    [name, description, img_url, id]);
}

const deleteCollectionModel = (id) => {
    return db.query("DELETE FROM collections WHERE id = ?", 
    [id]);
}

const getCollectionModel = (id) => {
    return db.query("SELECT * FROM collections WHERE id = ?", 
    [id]);
}

const getAllCollectionModel = () => {
    return db.query("SELECT * FROM collections");
}

//-----------------------------------------------------------------------------

const getAllMyVariantsProductsModel = (id) => {
    return db.query(
        `SELECT COUNT(v.id) AS count
            FROM collections c
            JOIN products p ON c.id = p.collections_id
            JOIN variants v ON p.id = v.products_id
            WHERE c.id = ?`, 
    [id]);
}

module.exports = {
    insertCollectionModel,
    updateCollectionModel,
    deleteCollectionModel,
    getCollectionModel,
    getAllCollectionModel,

    getAllMyVariantsProductsModel
}