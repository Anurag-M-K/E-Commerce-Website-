const userHelper = require('../../models/userHelper/userCartHelper')


const checkoutPage = (req,res)=>{
    let userData = req.session.user
    console.log("checking chckout page")
    res.render('users/checkOut',{user:true,admin:false,userData})
}


const payment = async (req,res)=>{
    let userData = req.session.user 
    if(req.session.user){
        let totalAmount = await userHelper.getTotalAmount(req.session.user._id)
       console.log(totalAmount)
        let products = userHelper.getCartProducts(req.session.user._id)
            let  cartCount =  userHelper.getCartCount(req.session.user._id)
            res.render('users/addressPayment',{user:true,admin:false,userData,cartCount,products,totalAmount})
        
        
    
       
    }
    }
   

module.exports = {
    checkoutPage,
    payment
}