const express = require('express')
const router = express.Router();
const usersController = require('../controllers/users/usersController')
const userDoLogin = require('../models/helpers/user-helper')
const nodemailer = require("nodemailer")



router.get('/',usersController.usersLog)
router.post('/signup',usersController.userSignup)
router.get('/usersLogin',usersController.userLogin)
router.get("/header/usersignup",usersController.signupFromHome)
router.post('/toHome',usersController.toUserHome)
router.get('/users/usersLogin',usersController.loginFromHome)
router.post('/login',usersController.userSessionController)
router.post('/signup',usersController.userSignupBcrypt)

router.post('/checkOtp',usersController.checkOtp)


module.exports=router