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

// admin user-management page direction

const userManagement = (req, res) => {
  adminHelper.showUser(req.body).then((userDetails) => {
    res.render("admin/user-management", { userDetails,admin:true,user:false});
  });
};

// admin product adding form

const productForm = (req, res) => {
  res.render("admin/addProduct",{admin:true,user:false});
};

const deleteCategoryController = (req, res) => {
  console.log(req.query.id);
  
  categoryHelper.deleteCategory(req.query.id).then((response) => {
    res.redirect("/admin/admincategory");
  });
};

//catogory page loading

const catogoryPageController = (req, res) => {
  categoryHelper.getAllCategories().then((Categories) => {
    console.log("done", Categories);
    res.render("admin/adminCategory", { Categories, admin: true, user: false });
  });
};

const addCategoryController = (req, res) => {
  console.log(req.body);
  categoryHelper.addCategory(req.body, (result) => {
    res.redirect("adminCategory");
  });
};

// brand button

const brandController = (req, res) => {
  
  brandHelpers.getAllBrands().then((Brand) => {
    res.render("admin/brandCategory", { Brand,admin:true,user:false });
  });
};

//admin panel button to admin panel
const adminPanelButtonController = (req, res) => {
  res.render("admin/admin-panel",{admin:true,user:false});
};

//adding brand
const addBrandController = (req, res) => {
  brandHelpers.addbrand(req.body, (result) => {
    res.redirect("brandCategory");
  });
};

//brand save and database connection

const brandSaveDatabaseController = (req, res) => {
  brandHelpers.addbrand(req.body, (result) => {
    res.redirect("brandCategory");
  });
};

//delteing brand
const deleteBrandController = (req, res) => {
  brandHelpers.deleteBrand(req.query.id).then((response) => {
    res.redirect("brandCategory");
  });
};


const productPage = (req,res)=>{
    productHelpers.getAllProducts().then((products)=>{
        
    res.render('admin/adminProductManage',{admin:true,user:false,products})

    })
}

module.exports = {
  loginview,
  adminLoginAction,
  userManagement,
  productForm,
  deleteCategoryController,
  catogoryPageController,
  addCategoryController,
  brandController,
  adminPanelButtonController,
  addBrandController,
  brandSaveDatabaseController,
  deleteBrandController,
  productPage
};
