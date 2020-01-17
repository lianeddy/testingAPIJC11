const jwt = require('jsonwebtoken');

module.exports = {
    createJWTToken : (payload) => {
        return jwt.sign(payload, 'uniqueKey', {
            expiresIn: '12h'
        })
    }
}