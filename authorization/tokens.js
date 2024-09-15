const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


const secret = 'mysecretsshhh';

function generateAccessToken(userData) {
    const payload = {
        email: userData.email,
        password: userData.password,
    }
    return jwt.sign(payload, secret, {expiresIn: '1h'});
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

function createHash(password) {
    return CryptoJS.SHA256(password).toString();
}

module.exports = {
    generateAccessToken,
    verifyToken,
    createHash,
};