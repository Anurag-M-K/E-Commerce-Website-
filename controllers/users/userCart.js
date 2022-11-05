const userHelper = require("../../models/helpers/user-helper")






const addToCart = (req,res)=>{
    
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{  
        res.redirect('/')
          })
}


const cart =  async(req,res)=>{
    let userData = req.session.user;
    if(req.session.loggedIn){
        let products =await userHelper.getCartProducts(req.session.user._id)
    console.log("products ", products);
   
     res.render('users/cart',{user:true,admin:false,userData,products})
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData });
    }
    
 }




module.exports = {
    cart,
    addToCart
}