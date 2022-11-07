
const checkoutPage = (req,res)=>{
    let userData = req.session.user
    console.log("checking chckout page")
    res.render('users/checkOut',{user:true,admin:false,userData})
}

module.exports = {
    checkoutPage
}