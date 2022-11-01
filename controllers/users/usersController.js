const userHelpers = require('../../models/helpers/user-helper')
const nodemailer = require("nodemailer")




//node mailer

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'anuragmk10@gmail.com',
        pass: 'nuofbwxshkmukqbc'
    }
});

const OTP = `${Math.floor(1000+ Math.random() * 9000)}`;


// const usersLog = (req,res)=>{
//     res.render('/users/usersLogin',{user:true,admin:false})
// }



const userHomePage = (req,res)=>{
    res.render('users/userHome',{user:true,admin:false})
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

   
    /////////////////////////////////////


















    userHelpers.doSignup(req.body).then((response)=>{
        console.log(response)
        res.render('users/usersSignup',{user:true,admin:false})
    })
    }




const loginFromHome = (req,res)=>{
    res.render('users/usersLogin',{user:true,admin:false})
}

// register click to user signup

const signupFromHome = (req,res)=>{
    res.render("users/usersSignup",{user:true,admin:false})
}

const userLogin = (req,res)=>{
    res.render('./users/usersLogin',{usre:true,admin:false})
}



const toUserHome = (req,res)=>{
    let user = req.session.user
    console.log(user+ "somebody login");
    res.render('users/userHome',{user:true,admin:false})
}


//session controller

const userSessionController = (req,res)=>{
    userHelpers.userDoLogin(req.body).then((response)=>{
        if(response.status){
            req.session.loggedIn=true
            req.session.user = response.user
            res.render('users/userHome',{user:true,admin:false,response})
        }else{
            res.render('users/usersLogin')
        }
    })
}

//
const userSignupBcrypt = (req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
        res.render("users/userHome",{user:true,admin:false})
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
    loginFromHome,
    signupFromHome,
    userLogin,
    toUserHome,
    userSessionController,
    userSignupBcrypt,
    checkOtp
    }