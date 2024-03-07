const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        user_id: user.id,
        user_permission: user.permission,
        expires_at: dayjs().add(60,'minutes').unix()
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}

const generateTokenInfluencer = (user) => {
    const payload = {
        user_id: user.id,
        user_permission: user.discount_code,
        expires_at: dayjs().add(60,'minutes').unix()
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
    generateTokenInfluencer,
    generateToken
}