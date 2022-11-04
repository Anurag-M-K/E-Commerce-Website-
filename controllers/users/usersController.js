const userHelpers = require("../../models/helpers/user-helper");
const nodemailer = require("nodemailer");
const session = require("express-session");
const productHelpers = require("../../models/productHelpers");
const bannerHelper = require("../../models/bannerHelper");
const categoryHelper = require("../../models/categoryHelper");

//user login
const userLogin = (req, res) => {
  let userData = req.session.user;
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("users/usersLogin", { user: true, admin: false, userData });
  }
};

//node mailer

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anuragmk10@gmail.com",
    pass: "nuofbwxshkmukqbc",
  },
});

const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

const userHomePage = (req, res) => {
  let userData = req.session.user;

  productHelpers.getAllProducts().then((products) => {
    bannerHelper.showBanner().then((banners) => {
      categoryHelper.getAllCategories().then((CategoryDetails) => {
        res.render("users/userHome", {
          user: true,
          admin: false,
          products,
          banners,
          CategoryDetails,
          userData,
        });
      });
    });
  });
};

// for send mail

const userSignup = (req, res) => {
  let verified = 0;

  const { Name, Email, Password } = req.body;
  let mailDetails = {
    from: "anuragmk10@gmail.com",
    to: Email,
    subject: "CRIC STORE",
    html: `<p> YOUR OTP FOR REGISTRATION IN CRIC STORE IS ${OTP}</P>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("error occurs");
    } else {
      console.log("Email send successfully");
    }
  });
  userHelpers
    .insertUserCredentials(verified, Name, Email, Password)
    .then((response) => {
      userId = response.insertedId;
      res.render("users/otpVerificationPage", {
        admin: false,
        user: false,
        userId,
      });
    });
};

// register click to user signup

const signupFromHome = (req, res) => {
  let userData = req.session.user;
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("users/usersSignup", { user: false, admin: false, userData });
  }
};

//session controller

const userSessionController = (req, res) => {
  let userData = req.session.user;
  console.log("Login Page");

  userHelpers.userDoLogin(req.body).then((response) => {
    console.log("vsvsv", response.status);
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      console.log("vsdvs", userData);
      bannerHelper.showBanner().then((banners) => {
        productHelpers.getAllProducts().then((products) => {
            res.redirect('/')
        //   res.render("users/userHome", {
        //     user: true,
        //     admin: false,
        //     banners,
        //     products,
        //     userData,
        //   });
        });
      });
    } else {
      res.redirect("/userslogin");
    }
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("error");
      res.send("Error");
    } else {
      res.redirect("/");
    }
  });
};

const userSignupBcrypt = (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    res.render("users/userHome", { admin: false });
  });
};

//nodemailer email sending
const checkOtp = (req, res) => {
  console.log(OTP);
  console.log(req.body);
  if (OTP == req.body.otpSend) {
    userHelpers.updateVerified(userId).then((response) => {
      console.log("success");
      console.log(OTP);
      res.redirect("/");
    });
  } else {
    console.log("not success");
  }
};

module.exports = {
  userLogin,
  userSignup,
  userHomePage,
  signupFromHome,
  userSessionController,
  userSignupBcrypt,
  checkOtp,
  logout,
};
