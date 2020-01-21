const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'lian.eddy@gmail.com',
        pass: 'mkpvrmobkemnzixk'
    },
    tls : {
        rejectUnauthorized :  false
    }
})

module.exports = transporter;
