
const cart = (req,res)=>{
    console.log("cart")
    res.render('users/cart',{user:true,admin:false})
}

module.exports = {
    cart
}