const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const getUserByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

const getUserById = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id]);
};

const registrarUser = ({name, lastname, email, password, permission}) =>{
    return db.query('INSERT INTO users (name, lastname, email, password, permission) VALUES (?,?,?,?,?)', 
    [name, lastname, email, password, permission]);
};

const getAllUsersModel = () => {
    return db.query('SELECT * FROM users')
};

const getUserModel = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id])
};

const deleteUserModel = (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id])
};

module.exports = {
    registrarUser,
    getUserByEmail,
    getUserById,
    getAllUsersModel,
    deleteUserModel,
    getUserModel
}