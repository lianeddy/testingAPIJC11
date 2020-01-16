const express = require('express');
const { userController } = require('../controller');
const router = express.Router();

router.get('/getall', userController.getUsers)
router.get('/getbyid/:id', userController.getUserbyId)
router.post('/register', userController.register)
router.delete('/delete/:id', userController.deleteUser)
router.patch('/edituser/:id', userController.editUser)

module.exports = router;