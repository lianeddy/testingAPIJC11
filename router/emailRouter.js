const express = require('express');
const { emailController } = require('../controller');
const router = express.Router();

router.post('/sendemail', emailController.sendEmail)

module.exports = router;
