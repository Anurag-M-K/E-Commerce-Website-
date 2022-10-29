const adminHelper = require("../../models/helpers/admin-helper");
const adminLogin = require("../../models/helpers/admin-helper");
const userHelper = require("../../models/helpers/user-helper");
const deleteCategory = require("../../models/categoryHelper");
const categoryHelper = require("../../models/categoryHelper");
const brandHelpers = require("../../models/brandHelpers");
const productHelpers = require("../../models/productHelpers");




const loginview = (req, res) => {
  res.render("../views/admin/admin-login", { admin: true, user: false });
  // res.render('../views/admin/index')
};

const adminLoginAction = (req, res) => {
  adminLogin.adminDoLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;

      res.render("admin/admin-panel", { admin: true, user: false });
    } else {
      res.redirect("/admin");
    }
  });
};


//admin panel button to admin panel
const adminPanelButtonController = (req, res) => {
  res.render("admin/admin-panel",{admin:true,user:false});
};





///admin logout

const adminLogoutControllers = (req,res)=>{
  req.session.destroy(function(err){
      if(err){
          res.send('error')
      }else{
          res.redirect('/admin')
      }
  })
}




module.exports = {
  loginview,

  adminLoginAction,


 
  adminPanelButtonController,
  
  adminLogoutControllers
};
