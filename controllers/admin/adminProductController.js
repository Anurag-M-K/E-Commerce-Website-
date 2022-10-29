const productHelper = require('../../models/productHelpers')


 //product adding form

const productForm = (req, res) => {
    res.render("admin/addProduct",{admin:true,user:false});
  };



  //multer stert

  const productAdding = (req,res)=>{
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

  module.exports = {
    productForm,
    productPage,
    productAdding,
    productDelete
  }