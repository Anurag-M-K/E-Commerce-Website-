

const { Router } = require('express');
const userHelper = require('../../models/userHelper/userCartHelper')




const addToCart = (req,res)=>{
    console.log("api call");
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{  
        // res.redirect('/')
        res.json({status:true})
          })
}





const cart =  async(req,res)=>{
    let userData = req.session.user;
    if(req.session.loggedIn){
        let products =await userHelper.getCartProducts(req.session.user._id)
    
            cartCount = await userHelper.getCartCount(req.session.user._id)
            console.log("this is cartCount ",cartCount)
           
     res.render('users/cart',{user:true,admin:false,userData,products,cartCount})
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData});
    }
    
 }


 const productCount = (req,res,next)=>{
    console.log("checking the inc or dec")
    userHelper.changeProductQuantity(req.body ).then((response)=>{
       res.json(response)
       
    })
 }



module.exports = {
    cart,
    addToCart,
    productCount
}