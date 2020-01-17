const { createJWTToken } = require('./helper/jwt')

console.log(createJWTToken({
    username: 'lian',
    id: 1
}))