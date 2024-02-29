const db = require('../db/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const getAllInfluencersModel = () => {
    return db.query('SELECT * FROM influencers')
};

const getInfluencerById = (id) => {
    return db.query('SELECT * FROM influencers WHERE id = ?', [id]);
};

const getInfluencerByEmail = (email) => {
    return db.query('SELECT * FROM influencers WHERE email = ?', [email]);
};

const getInfluencerByCode = (discount_code) => {
    return db.query('SELECT * FROM influencers WHERE discount_code = ?', [discount_code]);
};

const getAllCodesModel = () => {
    return db.query("SELECT discount_code FROM influencers");
}


const registrarInfluencer = ({ fullname, email, password, fb_account, tt_account, x_account, in_account, yt_account, discount_code, discount_percent }) => {
    return db.query(
        `INSERT INTO influencers 
        (fullname, email, password, fb_account, tt_account, x_account, in_account, yt_account, discount_code, discount_percent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullname, email, password, fb_account, tt_account, x_account, in_account, yt_account, discount_code, discount_percent]);
};

const updateInfluencerModel = (data, id) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE influencers SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

const changeInfluencerStatusModel = (id) => {
    return db.query(
        `UPDATE influencers
        SET status = CASE 
                    WHEN status = 0 THEN 1
                    WHEN status = 1 THEN 0
                 END
        WHERE id = ?`,[id])
}

const deleteInfluencerModel = (id) => {
    return db.query('DELETE FROM influencers WHERE id = ?', [id])
};

module.exports = {
    registrarInfluencer,
    getInfluencerByEmail,
    getInfluencerById,
    getInfluencerByCode,
    getAllInfluencersModel,
    getAllCodesModel,
    deleteInfluencerModel,
    updateInfluencerModel,
    changeInfluencerStatusModel
}