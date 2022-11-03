const userHelpers = require('../../models/helpers/user-helper')
const nodemailer = require("nodemailer")
const session =  require('express-session');
const productHelpers = require('../../models/productHelpers');
const bannerHelper = require('../../models/bannerHelper');



//node mailer

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'anuragmk10@gmail.com',
        pass: 'nuofbwxshkmukqbc'
    }
});

const OTP = `${Math.floor(1000+ Math.random() * 9000)}`;





const userHomePage = (req,res)=>{
    productHelpers.getAllProducts().then((products)=>{
        bannerHelper.showBanner().then((banners)=>{
            console.log(products)
            res.render('users/userHome',{user:true,admin:false,products,banners})
        })
    })
    
}

// for send mail 




const userSignup = (req,res)=>{

    let verified =  0

    const {Name,Email,Password} = req.body
    let mailDetails = {
        from : 'anuragmk10@gmail.com',
        to : Email,
        subject : 'CRIC STORE',
        html : `<p> YOUR OTP FOR REGISTRATION IN CRIC STORE IS ${OTP}</P>`
    }

    mailTransporter.sendMail(mailDetails, function(err,data){
        if(err){
            console.log('error occurs')
        }else{
            console.log('Email send successfully')
        }
    })
    userHelpers.insertUserCredentials(verified,Name,Email,Password).then((response)=>{
        userId = response.insertedId
        res.render('users/otpVerificationPage',{admin:false,user:true})
    })

   
    userHelpers.doSignup(req.body).then((response)=>{
        console.log(response)
        res.render('users/usersSignup',{user:true,admin:false})
    })
    }





// register click to user signup

const signupFromHome = (req,res)=>{
    res.render("users/usersSignup",{user:false,admin:false})
}

//session controller

const userSessionController = (req,res)=>{
    let user = req.session.user
    userHelpers.userDoLogin(req.body).then((response)=>{
    if(response.status){
        req.session.loggedIn = true
        req.session.user = response.user
        res.render('users/userHome',{user:true,admin:false,user})
    }else{
        res.render('users/usersLogin',{admin:false,user:false,user})
    }          
   })
    }

    const logout = (req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                console.log('error')
                res.send("Error")
            }else{
         
            res.render('users/userHome',{user:true,admin:false,})
        }
      })
    }





const userSignupBcrypt = (req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
        res.render("users/userHome",{admin:false})
    })
}


//nodemailer email sending 
const checkOtp = (req,res)=>{
    console.log(OTP)
    if(OTP == req.body.otpSend){
        userHelpers.updateVerified(userId).then((response)=>{
            console.log('success')

            res.render("users/userHome",{user:true,admin:false})
        })
    }
    else{
        console.log('not success')
    }
}












module.exports = {

    userSignup,
    userHomePage,
    signupFromHome,
    userSessionController,
    userSignupBcrypt,
    checkOtp,
    logout 
  
    }