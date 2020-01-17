const express = require('express');
const { userController } = require('../controller');
const router = express.Router();

router.get('/getall', userController.getUsers)
router.get('/getbyid/:id', userController.getUserbyId)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/changepass', userController.changePass)
router.delete('/delete/:id', userController.deleteUser)
router.patch('/edituser/:id', userController.editUser)

module.exports = router;