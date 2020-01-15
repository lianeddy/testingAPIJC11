const express = require('express');
const { userController } = require('../controller');
const router = express.Router();

router.get('/getallusers', userController.getUsers)

module.exports = router;