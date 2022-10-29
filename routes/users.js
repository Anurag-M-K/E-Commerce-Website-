const { response } = require('express');
const express = require('express')
const router = express.Router();
const usersController = require('../controllers/users/usersController')
const userHelpers = require('../models/helpers/user-helper')



router.get('/',usersController.usersLog)

router.post('/signup',usersController.userSignup)

router.get('/login',usersController.userLogin)

router.get("/header/usersignup",usersController.signupFromHome)



router.post('/toHome',usersController.toUserHome)

router.get('/header/userlogin',usersController.loginFromHome)

router.post('/login',usersController.userSessionController)

//user signup bcrypt 
router.post('/signup',usersController.userSignupBcrypt)



module.exports=router