
const productHelper = require('../../models/productHelpers')
const category = require('../../models/categoryHelper')
const Brand = require('../../models/brandHelpers');
 //product adding form

const productForm = (req, res) => {
    res.render("admin/addProduct",{admin:true,user:false});
  };

  //multer stert

  const productAdding = (req,res)=>{
    const {
        
        productName,
        Price,
        Category,
        brandName,
        Quantity,
        
    }=req.body
    productHelper.addProduct({
        
        Pitcure: req.file.filename,
        productName,
        Price,
        Category,
        brandName,
        Quantity
        
    }).then((response)=>{
        console.log(req.file)
        res.redirect('/admin/product')
    })
} 

const productPage = (req,res)=>{
    productHelper.getAllProducts().then((products)=>{
        
    res.render('admin/adminProductManage',{admin:true,user:false,products})

    })
}





// delete product

const productDelete = (req,res)=>{
    productHelper.deleteProducts(req.query.id).then((response)=>{
        res.redirect("/admin/product");
    })
}







//product update button to update

// const productUpdateController = (req,res)=>{
//     let id = req.body.id;
//     let newProductData = req.body
//     let newImageId = req.file.filename
//     productHelper.updateProductDetails(id,newProductData,newImageId).then(()=>{
//         productHelper.getAllProducts().then((products)=>{
//             res.redirect('admin/product',{admin:true,products})
//         })
//     })
// }


const adminAddProductPage = (req,res)=>{
    category.getAllCategories().then((categoryDetails)=>{
        Brand.getAllBrands().then((brandDetails)=>{
            res.redirect('admin/product',{admin:true,categoryDetails,brandDetails})
        })
    })
}



const updateProductDetails = async(req,res)=>{
    console.log(req.query.id);
    
        let productId = req.query.id;
        let product = await productHelper.getProductDetails(productId);   
        category.getAllCategories().then((categoryDetails)=>{
            
            Brand.getAllBrands().then((brandDetails)=>{
          
                res.render('admin/editProduct',{
                    admin:true,
                    categoryDetails,
                    brandDetails,product
                })
            })

        })
    
}





const updateProductDetailsAction = (req,res)=>{
    console.log("id",req.body);

        let id = req.body.id;
        let newProductData = req.body;
        let newImageId = req.file.filename;
        productHelper.updateProductDetails(id,newProductData,newImageId).then(()=>{
            productHelper.getAllProducts().then((products)=>{
                res.render('admin/adminProductManage',{
                    
                    admin:true,user:false,products
                })
            })
        })
    
}





  module.exports = {
    productForm,

    productPage,

    productAdding,
    
    productDelete,

  

    // productUpdateController,

    adminAddProductPage,

    updateProductDetails,

    updateProductDetailsAction

    
  
  }