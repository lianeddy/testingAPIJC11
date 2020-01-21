const express = require('express');
const { userController } = require('../controller');
const router = express.Router();
const { auth } = require('../helper/auth')

router.get('/getall', userController.getUsers)
router.get('/getbyid/:id', userController.getUserbyId)
router.post('/login', userController.login)
router.post('/keeplogin', auth, userController.keepLogin )
router.post('/register', userController.register)
router.post('/emailverification', userController.emailVerification)
router.post('/changepass', userController.changePass)
router.delete('/delete/:id', userController.deleteUser)
router.patch('/edituser/:id', userController.editUser)

module.exports = router;