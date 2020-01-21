const { createJWTToken } = require('./helper/jwt')
const Crypto = require('crypto');

let password ='123123123'

let hashPassword = Crypto.createHmac("sha256", "uniqueKey").update(password).digest("hex")

console.log(hashPassword.length)