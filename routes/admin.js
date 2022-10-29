const express = require("express");
const router = express.Router();
const adloginController = require("../controllers/admin/adloginController");
const adminCategory = require('../controllers/admin/adminCategory')
const usersController = require("../controllers/users/usersController");
const adminHelper = require("../models/helpers/admin-helper");
const adminLoginHelper = require("../models/helpers/admin-helper");
const productHelper = require("../models/productHelpers.js");

const { response } = require("express");
const brandHelpers = require("../models/brandHelpers");
const multer = require('multer');
// const productHelpers = require("../models/productHelpers.js");

//Multer Start
const storage = multer.diskStorage({
    destination: './public/images',
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype == 'image/jpeg'|| file.mimetype == 'image/jpg'
        ){
            cb(null, true)
        }else{
            cb(null, false)
            cb(new Error('only jpeg, jpg'))
        }
    }
})
//Multer End


router.get("/admin", adloginController.loginview);

router.post("/home-admin", adloginController.adminLoginAction);

router.get("/", usersController.userHomePage);

router.get("/user-management", adloginController.userManagement);


//add product form page
router.get("/addProductPage", adloginController.productForm);

// for fijnding user and pass them to admin side user list
router.get("/", adloginController.userManagement);

// DELETE  CATEGORY
router.get("/deleteCategory", adminCategory.deleteCategoryController);

//catgeory page
router.get("/adminCategory", adminCategory.catogoryPageController);

//add catogory
router.post("/adminCategory", adminCategory.addCategoryController);

//brand category button
router.get("/brandCategory", adloginController.brandController);

//admin panel button to admin panel
router.get("/admin-panel", adloginController.adminPanelButtonController);

//add brand

router.post("/brandCategory", adloginController.addBrandController);

// brand save to brand page and database
router.post("/brandCategory", adloginController.brandSaveDatabaseController);

router.get("/deleteBrand", adloginController.deleteBrandController);




// Multer Start
router.post('/addProduct',upload.single('productImage'),(req,res)=>{
    console.log("Checking");
    console.log(req.body);
    console.log(req.files);
    
    productHelper.addProduct({
        
        Pitcure: req.file.filename,
        productionData: req.body
        
    }).then((response)=>{
        console.log(req.file)
        
        res.redirect('/admin/product')
    })
})
//Multer End




//log out

router.get('/adminLogout',adloginController.adminLogoutControllers)


//edit product 
router.get('/editProduct', async(req,res)=>{
    let products =await productHelper.getProductDetails(req.query.id).then((response)=>{
        
    res.render('admin/editProduct',{products,admin:true,user:false})
})
})







router.get('/product',adloginController.productPage)


//delte product

router.get('/deleteProduct',(req,res)=>{
    productHelper.deleteProducts(req.query.id).then((response)=>{
        res.redirect("/admin/product");
    })
})



module.exports = router
