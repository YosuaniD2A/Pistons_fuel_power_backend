const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertImageGalleryModel = ({img_url, collection, products_id}) => {
    return db.query("INSERT INTO gallery (img_url, collection, products_id) VALUES (?,?,?)", 
    [img_url, collection, products_id]); 
}

const updateImageGalleryModel = (id, {img_url, collection, products_id}) => {
    return db.query("UPDATE gallery SET img_url = ?, collection = ?, products_id = ? WHERE id = ?", 
    [img_url, collection, products_id, id]);
}

const deleteImageGalleryModel = (id) => {
    return db.query("DELETE FROM gallery WHERE id = ?", 
    [id]);
}

const getImageGalleryModel = (id) => {
    return db.query("SELECT * FROM gallery WHERE id = ?", 
    [id]);
}

const getAllImageGalleryModel = () => {
    return db.query("SELECT * FROM gallery");
}


module.exports = {
    insertImageGalleryModel,
    updateImageGalleryModel,
    deleteImageGalleryModel,
    getImageGalleryModel,
    getAllImageGalleryModel
}