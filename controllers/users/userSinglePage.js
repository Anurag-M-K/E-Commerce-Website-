const userDisplay = require('../../models/userDisplay')

const single = async(req,res)=>{
    let productId = req.query.id
    let product = await userDisplay.viewProductDetails(productId)
   
    res.render('users/singlePage',{user:true,admin:false,product})
}






module.exports = {
    single
}