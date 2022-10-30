const userHelpers = require('../../models/helpers/user-helper')



const usersLog = (req,res)=>{
    res.render('../views/users/usersLogin')
}




// for send mail 




const userSignup = (req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
        console.log(response)
        res.render('users/usersSignup',{user:true,admin:false})
    })
    }


const userHomePage = (req,res)=>{
    res.render('users/userHome',{user:true,admin:false})
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








// exports.usersLog = usersLog;
module.exports = {
    usersLog,
    userSignup,
    userHomePage,
    loginFromHome,
    signupFromHome,
    userLogin,
    toUserHome,
    userSessionController,
    userSignupBcrypt,
    }