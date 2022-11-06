

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
           
     res.render('users/cart',{user:true,admin:false,userData,products,cartCount})
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData});
    }
    
 }




module.exports = {
    cart,
    addToCart
}