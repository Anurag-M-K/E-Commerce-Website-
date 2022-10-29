const express = require("express");
const router = express.Router();
const adloginController = require("../controllers/admin/adloginController");
const adminCategory = require('../controllers/admin/adminCategory')
const usersController = require("../controllers/users/usersController");
const adminHelper = require("../models/helpers/admin-helper");
const adminLoginHelper = require("../models/helpers/admin-helper");
const productHelper = require("../models/productHelpers.js");
const adminProductController = require('../controllers/admin/adminProductController')
const adminBrandController = require('../controllers/admin/adminBrandController')
const adminUserController = require('../controllers/admin/adminUserController')
const { response } = require("express");
const brandHelpers = require("../models/brandHelpers");
const multer = require('multer');



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





//admin panel button to admin panel
router.get("/admin-panel", adloginController.adminPanelButtonController);


//log out

router.get('/adminLogout',adloginController.adminLogoutControllers)





//+++++++++++++++++++++++++++++++++++++++++ADMIN USER MANAGE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// for finding user and pass them to admin side user list
router.get("/", adminUserController.userManagement);

router.get("/user-management", adminUserController.userManagement);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//






//-------------------------------------------BRAND DETAILS----------------------------------------------------------------------------//


//add brand

router.post("/brandCategory", adminBrandController.addBrandController);

// brand save to brand page and database

router.post("/brandCategory", adminBrandController.brandSaveDatabaseController);

//deletin brand
router.get("/deleteBrand", adminBrandController.deleteBrandController);

//brand category button
router.get("/brandCategory", adminBrandController.brandController);

//----------------------------------------------------------------------------------------------------------------------------------//





/******************************************************CATEGORY DETAILS*******************************************************************/

//catgeory page
router.get("/adminCategory", adminCategory.catogoryPageController);


//add catogory
router.post("/adminCategory", adminCategory.addCategoryController);


// DELETE  CATEGORY
router.get("/deleteCategory", adminCategory.deleteCategoryController);

/*****************************************************************************************************************************************/





/////////////////////////////////////////////////////////PRODUCT DETAILS//////////////////////////////////////////////////////////////////


// Multer Start
router.post('/addProduct',upload.single('productImage'),adminProductController.productAdding)


//product page loading

router.get('/product',adminProductController.productPage)


//delte product

router.get('/deleteProduct',adminProductController.productDelete)


//add product form page
router.get("/addProductPage", adminProductController.productForm);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router
