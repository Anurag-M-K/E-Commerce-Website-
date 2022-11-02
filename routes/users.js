const express = require('express')
const router = express.Router();
const usersController = require('../controllers/users/usersController')
const userDoLogin = require('../models/helpers/user-helper')
const nodemailer = require("nodemailer")
const userCart = require('../controllers/users/userCart')

router.get("/", usersController.userHomePage);
// router.get('/',usersController.usersLog)
router.post('/signup',usersController.userSignup)
router.get("/header/usersignup",usersController.signupFromHome)
router.post('/login',usersController.userSessionController)
router.post('/signup',usersController.userSignupBcrypt)
router.get('/logout',usersController.logout)
router.post('/checkOtp',usersController.checkOtp)



router.get('/users/cart',userCart.cart)



module.exports=router