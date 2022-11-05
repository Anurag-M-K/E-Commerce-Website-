
const checkoutPage = (req,res)=>{
    let userData = req.session.user
    res.render('users/checkOut',{user:true,admin:false,userData})
}

module.exports = {
    checkoutPage
}