const userHelper = require("../../models/helpers/user-helper")

const cart = (req,res)=>{
   
    res.render('users/cart',{user:true,admin:false})
}

const addToCart = (req,res)=>{
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{
        res.render('users/cart')
          })
}


module.exports = {
    cart,
    addToCart
}