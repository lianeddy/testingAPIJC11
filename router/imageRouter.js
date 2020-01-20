const express = require('express');
const { imageController } = require('../controller');
const router = express.Router();

router.post('/upload', imageController.uploadImage)

module.exports = router;