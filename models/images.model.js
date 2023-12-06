const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const insertImageModel = ({img_url}) => {
    return db.query("INSERT INTO images (img_url) VALUES (?)", 
    [img_url]); 
}

const updateImageModel = (id, {img_url}) => {
    return db.query("UPDATE images SET img_url = ? WHERE id = ?", 
    [img_url, id]);
}

const deleteImageModel = (id) => {
    return db.query("DELETE FROM images WHERE id = ?", 
    [id]);
}

const getImageModel = (id) => {
    return db.query("SELECT * FROM images WHERE id = ?", 
    [id]);
}

const getAllImageModel = () => {
    return db.query("SELECT * FROM images");
}

//---------------------------------------------------

const insertLinkImageModel = ({variants_id, images_id}) => {
    return db.query("INSERT INTO variants_has_images (variants_id, images_id) VALUES (?,?)", 
    [variants_id, images_id]); 
}

const deleteLinkImageModel = (id) => {
    return db.query("DELETE FROM variants_has_images WHERE id = ?", 
    [id]);
}

module.exports = {
    insertImageModel,
    updateImageModel,
    deleteImageModel,
    getImageModel,
    getAllImageModel,

    insertLinkImageModel,
    deleteLinkImageModel
}