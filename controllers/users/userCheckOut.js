
const checkoutPage = (req,res)=>{
    res.render('users/checkOut',{user:true,admin:false})
}

module.exports = {
    checkoutPage
}