const express = require('express');
const { imageController } = require('../controller');
const router = express.Router();

router.post('/upload', imageController.uploadImage);
router.get('/getproducts', imageController.getAllImages)

module.exports = router;