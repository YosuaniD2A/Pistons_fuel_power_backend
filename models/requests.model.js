const db = require('../configs/db.config').promise();

/*----------------------------- SQL Queries ---------------------------------------------- */

const createRequestModel = (data) => {
    return db.query(`INSERT INTO payment_requests (influencerId, fullname, email, requestAmount)
    VALUES (?, ?, ?, ?)`,[data.influencerId, data.fullname, data.email, data.requestAmount]);
}

const getAllRequestsModel = () => {
    return db.query(`SELECT * FROM payment_requests`);
}

const getAllRequestsRequestedModel = () => {
    return db.query(`SELECT COUNT(*) as count FROM payment_requests WHERE requestStatus = 'Requested'`);
}

const getRequestsByInfluencerIdModel = (id) => {
    return db.query(`SELECT * FROM payment_requests WHERE influencerId = ?`,[id]);
}

const updateRequestByIdModel = (id, data) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE payment_requests SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

module.exports = {
    createRequestModel,
    getAllRequestsModel,
    getAllRequestsRequestedModel,
    getRequestsByInfluencerIdModel,
    updateRequestByIdModel
}