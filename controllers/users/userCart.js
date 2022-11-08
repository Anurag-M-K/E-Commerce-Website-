

const { Router } = require('express');
const userCartHelper = require('../../models/userHelper/userCartHelper');
const userHelper = require('../../models/userHelper/userCartHelper')




const addToCart = (req,res)=>{
   
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{  
        res.json({status:true})
          })
}





const cart =  async(req,res)=>{
  
    let userData = req.session.user;
    if(req.session.loggedIn){
      
        let products =await userHelper.getCartProducts(req.session.user._id)
       
        cartCount = await userHelper.getCartCount(req.session.user._id)
       
        let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
       
        let subTotal = await userCartHelper.getSubTotal(req.session.user._id)
       
           
     res.render('users/cart',{user:true,admin:false,userData,products,cartCount,totalAmount,subTotal})
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData});
    }
    
 }


 const productCount = (req,res,next)=>{
    userHelper.changeProductQuantity(req.body ).then((response)=>{
       res.json(response)
       
    })
 }



module.exports = {
    cart,
    addToCart,
    productCount
}